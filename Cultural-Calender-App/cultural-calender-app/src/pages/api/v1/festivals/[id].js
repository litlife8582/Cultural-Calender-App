import dbConnect from '@/lib/mongodb';
import Festival from '@/models/Festival';
import Ritual from '@/models/Ritual';
import { authenticateAPIKey, rateLimit } from '@/middleware/auth';

async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ 
      status: 'error',
      error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed' }
    });
  }

  try {
    await dbConnect();

    const festival = await Festival.findById(id).select('-__v').lean();

    if (!festival) {
      return res.status(404).json({
        status: 'error',
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: `Festival with ID '${id}' not found`
        }
      });
    }

    // Fetch associated rituals
    const rituals = await Ritual.find({ festival_id: id })
      .select('_id name type')
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        id: festival._id,
        name: festival.name,
        alternate_names: festival.alternate_names,
        religion: festival.religion,
        type: festival.type,
        description: festival.description,
        significance: festival.significance,
        mythology: festival.mythology,
        date: festival.date,
        duration_days: festival.duration_days,
        days: festival.days,
        celebrated_in: festival.celebrated_in,
        states: festival.states,
        public_holiday: festival.public_holiday,
        regional_variations: festival.regional_variations,
        traditional_foods: festival.traditional_foods,
        colors: festival.colors,
        symbols: festival.symbols,
        rituals: rituals.map(r => ({
          id: r._id,
          name: r.name,
          type: r.type
        })),
        created_at: festival.createdAt,
        updated_at: festival.updatedAt
      }
    });

  } catch (error) {
    console.error('Error fetching festival:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'INVALID_PARAMETER',
          message: 'Invalid festival ID format'
        }
      });
    }

    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching the festival'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
