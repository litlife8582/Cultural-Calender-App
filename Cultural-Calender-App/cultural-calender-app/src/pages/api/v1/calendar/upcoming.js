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
      days = 30,
      state,
      limit = 10
    } = req.query;

    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + parseInt(days));

    // Build query
    let query = {
      'date.gregorian': {
        $gte: currentDate,
        $lte: futureDate
      }
    };

    if (state) {
      query.states = state;
    }

    // Get upcoming festivals
    const festivals = await Festival.find(query)
      .sort({ 'date.gregorian': 1 })
      .limit(parseInt(limit))
      .select('name date.gregorian type religion public_holiday')
      .lean();

    res.status(200).json({
      status: 'success',
      data: {
        current_date: currentDate.toISOString().split('T')[0],
        upcoming_festivals: festivals.map(festival => {
          const festivalDate = new Date(festival.date.gregorian);
          const daysUntil = Math.ceil((festivalDate - currentDate) / (1000 * 60 * 60 * 24));

          return {
            id: festival._id,
            name: festival.name,
            date: festival.date.gregorian.toISOString().split('T')[0],
            days_until: daysUntil,
            type: festival.type,
            religion: festival.religion,
            public_holiday: festival.public_holiday
          };
        })
      }
    });

  } catch (error) {
    console.error('Error fetching upcoming festivals:', error);
    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching upcoming festivals'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
