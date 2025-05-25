const express = require('express');
const router = express.Router();
const { generateResponse } = require('../services/googleAI');

// Simple in-memory rate limiter
const rateLimiter = {
  requests: {},
  resetTime: 60 * 1000, // 1 minute in milliseconds
  limit: 5, // 5 requests per minute
  
  // Check if the request is allowed
  isAllowed: function(ip) {
    const now = Date.now();
    
    // Initialize or clean up old entries
    if (!this.requests[ip] || now - this.requests[ip].timestamp > this.resetTime) {
      this.requests[ip] = {
        count: 0,
        timestamp: now
      };
    }
    
    // Increment count and check if over limit
    this.requests[ip].count++;
    return this.requests[ip].count <= this.limit;
  }
};

router.post('/', async (req, res) => {
  try {
    // Get client IP for rate limiting
    const clientIp = req.ip || req.connection.remoteAddress;
    
    // Check rate limit
    if (!rateLimiter.isAllowed(clientIp)) {
      return res.status(429).json({ 
        error: 'Too Many Requests',
        message: 'You have sent too many messages. Please wait a few moments before sending a new message.'
      });
    }
    
    const { message } = req.body;
    
    // Add context to the prompt
    const prompt = `You are a helpful AI assistant for an educational platform that teaches programming and AI. 
    Respond to the following message in a friendly and informative way: ${message}`;
    
    const aiResponse = await generateResponse(prompt);
    
    res.json({
      message: aiResponse,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Sorry, an error occurred. Please try again.'
    });
  }
});

module.exports = router; 