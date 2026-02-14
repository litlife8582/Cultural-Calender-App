import dbConnect from '@/lib/mongodb';
import Ritual from '@/models/Ritual';
import { authenticateAPIKey, rateLimit } from '@/middleware/auth';

async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed' }
    });
  }

  try {
    await dbConnect();

    const { 
      festival_id,
      type,
      difficulty,
      duration,
      page = 1, 
      limit = 20 
    } = req.query;

    // Build query
    let query = {};

    if (festival_id) {
      query.festival_id = festival_id;
    }

    if (type) {
      query.type = type;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (duration) {
      query.duration_minutes = { $lte: parseInt(duration) };
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), 100);
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const rituals = await Ritual.find(query)
      .sort({ festival_id: 1, duration_minutes: 1 })
      .limit(limitNum)
      .skip(skip)
      .select('-__v')
      .lean();

    const totalCount = await Ritual.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        rituals: rituals.map(ritual => ({
          id: ritual._id,
          name: ritual.name,
          festival_id: ritual.festival_id,
          festival_name: ritual.festival_name,
          type: ritual.type,
          difficulty: ritual.difficulty,
          duration_minutes: ritual.duration_minutes,
          description: ritual.description,
          significance: ritual.significance,
          timing: ritual.timing,
          materials_required: ritual.materials_required,
          steps: ritual.steps,
          regional_variations: ritual.regional_variations,
          dos: ritual.dos,
          donts: ritual.donts,
          mantras: ritual.mantras,
          created_at: ritual.createdAt,
          updated_at: ritual.updatedAt
        })),
        pagination: {
          current_page: pageNum,
          total_pages: Math.ceil(totalCount / limitNum),
          total_results: totalCount,
          per_page: limitNum
        }
      }
    });

  } catch (error) {
    console.error('Error fetching rituals:', error);
    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching rituals'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
