// This file routes all API requests to our Express server
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const coursesRouter = require('../server/routes/courses');
const chatRouter = require('../server/routes/chat');

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: [
    'https://newfolder-7mxe.onrender.com',
    'http://localhost:3000',
    /\.vercel\.app$/
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

app.use(express.json());

// MongoDB connection for serverless environment
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  bufferCommands: false, // Disable mongoose buffering
  autoCreate: false,     // Don't create collections automatically
};

// Connect to MongoDB if URI is available
const mongoURI = process.env.MONGODB_URI;
if (mongoURI) {
  mongoose.connect(mongoURI, mongooseOptions)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('MongoDB connection error:', {
        name: err.name,
        message: err.message
      });
    });
}

// Routes
app.use('/api/courses', coursesRouter);
app.use('/api/chat', chatRouter);

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Add a test route to diagnose 404 issues
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working correctly' });
});

// Add a catch-all route for API requests
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Export as a serverless function handler instead of just the Express app
module.exports = (req, res) => {
  // This ensures Express can handle Vercel serverless function requests
  return app(req, res);
};
