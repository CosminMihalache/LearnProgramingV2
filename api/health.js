// Direct handler for Vercel serverless functions
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://newfolder-7mxe.onrender.com',
    'http://localhost:3000',
    /\.vercel\.app$/,
    '*'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// Simple test route
app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Handle the request
module.exports = async (req, res) => {
  // For debugging
  console.log('Request received:', {
    url: req.url,
    method: req.method,
    headers: req.headers
  });
  
  return app(req, res);
};
