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
      include_public_holidays 
    } = req.query;

    if (!year) {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'MISSING_REQUIRED_FIELD',
          message: 'Year parameter is required'
        }
      });
    }

    // Build query
    let query = {};

    if (month) {
      const startDate = new Date(`${year}-${String(month).padStart(2, '0')}-01`);
      const endDate = new Date(year, month, 0);
      query['date.gregorian'] = { $gte: startDate, $lte: endDate };
    } else {
      const startDate = new Date(`${year}-01-01`);
      const endDate = new Date(`${year}-12-31`);
      query['date.gregorian'] = { $gte: startDate, $lte: endDate };
    }

    if (state) {
      query.states = state;
    }

    if (religion) {
      query.religion = religion;
    }

    if (include_public_holidays === 'true') {
      query.public_holiday = true;
    }

    // Get all festivals for the period
    const festivals = await Festival.find(query)
      .sort({ 'date.gregorian': 1 })
      .select('name type date.gregorian public_holiday duration_days')
      .lean();

    // Group by date
    const calendarMap = new Map();
    
    festivals.forEach(festival => {
      const dateKey = festival.date.gregorian.toISOString().split('T')[0];
      
      if (!calendarMap.has(dateKey)) {
        calendarMap.set(dateKey, {
          date: dateKey,
          day_of_week: festival.date.gregorian.toLocaleDateString('en-US', { weekday: 'long' }),
          festivals: []
        });
      }

      calendarMap.get(dateKey).festivals.push({
        id: festival._id,
        name: festival.name,
        type: festival.type,
        public_holiday: festival.public_holiday
      });
    });

    const calendarData = Array.from(calendarMap.values()).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    res.status(200).json({
      status: 'success',
      data: {
        year: parseInt(year),
        month: month ? parseInt(month) : null,
        month_name: month ? monthNames[parseInt(month) - 1] : null,
        festivals: calendarData,
        total_festival_days: calendarData.length,
        public_holidays: festivals.filter(f => f.public_holiday).length
      }
    });

  } catch (error) {
    console.error('Error fetching calendar:', error);
    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching the calendar'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
