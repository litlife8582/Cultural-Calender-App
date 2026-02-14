export function authenticateAPIKey(handler) {
  return async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    
    if (!apiKey) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'INVALID_API_KEY',
          message: 'API key is required. Please provide X-API-Key header.'
        }
      });
    }

    // In production, validate against database
    if (apiKey !== process.env.API_KEY) {
      return res.status(401).json({
        status: 'error',
        error: {
          code: 'INVALID_API_KEY',
          message: 'Invalid API key provided.'
        }
      });
    }

    // API key is valid, proceed to handler
    return handler(req, res);
  };
}

export function rateLimit(handler) {
  // Simple in-memory rate limiting (use Redis in production)
  const requests = new Map();
  const WINDOW_MS = 60 * 60 * 1000; // 1 hour
  const MAX_REQUESTS = 100; // 100 requests per hour for free tier

  return async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    const now = Date.now();
    const windowStart = now - WINDOW_MS;

    if (!requests.has(apiKey)) {
      requests.set(apiKey, []);
    }

    const userRequests = requests.get(apiKey).filter(time => time > windowStart);
    
    if (userRequests.length >= MAX_REQUESTS) {
      const oldestRequest = Math.min(...userRequests);
      const retryAfter = Math.ceil((oldestRequest + WINDOW_MS - now) / 1000);

      res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
      res.setHeader('X-RateLimit-Remaining', 0);
      res.setHeader('X-RateLimit-Reset', Math.floor((oldestRequest + WINDOW_MS) / 1000));

      return res.status(429).json({
        status: 'error',
        error: {
          code: 'RATE_LIMIT_EXCEEDED',
          message: `Rate limit exceeded. Try again in ${retryAfter} seconds`,
          details: {
            retry_after: retryAfter
          }
        }
      });
    }

    userRequests.push(now);
    requests.set(apiKey, userRequests);

    res.setHeader('X-RateLimit-Limit', MAX_REQUESTS);
    res.setHeader('X-RateLimit-Remaining', MAX_REQUESTS - userRequests.length);
    res.setHeader('X-RateLimit-Reset', Math.floor((now + WINDOW_MS) / 1000));

    return handler(req, res);
  };
}
