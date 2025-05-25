const { generateResponse } = require('../server/services/googleAI');

// Simple in-memory rate limiter (per serverless instance)
const rateLimiter = {
  requests: {},
  resetTime: 60 * 1000, // 1 minute
  limit: 5,
  isAllowed(ip) {
    const now = Date.now();
    if (!this.requests[ip] || now - this.requests[ip].timestamp > this.resetTime) {
      this.requests[ip] = { count: 0, timestamp: now };
    }
    this.requests[ip].count++;
    return this.requests[ip].count <= this.limit;
  }
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
  if (!rateLimiter.isAllowed(clientIp)) {
    res.status(429).json({
      error: 'Too Many Requests',
      message: 'You have sent too many messages. Please wait a few moments before sending a new message.'
    });
    return;
  }
  const { message } = req.body || {};
  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }
  const prompt = `You are a helpful AI assistant for an educational platform that teaches programming and AI.\nRespond to the following message in a friendly and informative way: ${message}`;
  try {
    const aiResponse = await generateResponse(prompt);
    res.status(200).json({ response: aiResponse });
  } catch (err) {
    res.status(500).json({ error: 'AI service error', details: err.message });
  }
};
