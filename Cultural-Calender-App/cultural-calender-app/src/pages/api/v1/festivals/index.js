import dbConnect from '@/lib/mongodb';
import Festival from '@/models/Festival';
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
      year, 
      month, 
      state, 
      religion, 
      type,
      page = 1, 
      limit = 20 
    } = req.query;

    // Build query
    let query = {};

    if (year) {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query['date.gregorian'] = { $gte: startDate, $lte: endDate };
    }

    if (month && year) {
      const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-01`);
      const endDate = new Date(year, month, 0); // Last day of month
      query['date.gregorian'] = { $gte: startDate, $lte: endDate };
    }

    if (state) {
      query.states = state;
    }

    if (religion) {
      query.religion = religion;
    }

    if (type) {
      query.type = type;
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = Math.min(parseInt(limit), 100); // Max 100 per page
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const festivals = await Festival.find(query)
      .sort({ 'date.gregorian': 1 })
      .limit(limitNum)
      .skip(skip)
      .select('-__v')
      .lean();

    const totalCount = await Festival.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        festivals: festivals.map(festival => ({
          id: festival._id,
          name: festival.name,
          alternate_names: festival.alternate_names,
          religion: festival.religion,
          type: festival.type,
          description: festival.description,
          significance: festival.significance,
          date: festival.date,
          duration_days: festival.duration_days,
          celebrated_in: festival.celebrated_in,
          states: festival.states,
          public_holiday: festival.public_holiday,
          rituals_count: festival.rituals?.length || 0,
          created_at: festival.createdAt,
          updated_at: festival.updatedAt
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
    console.error('Error fetching festivals:', error);
    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching festivals'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
