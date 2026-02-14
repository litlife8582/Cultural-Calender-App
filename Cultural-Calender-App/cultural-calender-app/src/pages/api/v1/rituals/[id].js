import dbConnect from '@/lib/mongodb';
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

    const ritual = await Ritual.findById(id).select('-__v').lean();

    if (!ritual) {
      return res.status(404).json({
        status: 'error',
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: `Ritual with ID '${id}' not found`
        }
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
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
      }
    });

  } catch (error) {
    console.error('Error fetching ritual:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        status: 'error',
        error: {
          code: 'INVALID_PARAMETER',
          message: 'Invalid ritual ID format'
        }
      });
    }

    res.status(500).json({
      status: 'error',
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'An error occurred while fetching the ritual'
      }
    });
  }
}

export default rateLimit(authenticateAPIKey(handler));
