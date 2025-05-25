const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
let storage;
let upload;

// Create MongoDB storage if MongoDB URI is available
if (process.env.MONGODB_URI) {
  const { GridFsStorage } = require('multer-gridfs-storage');
  
  // MongoDB connection URI
  const mongoURI = process.env.MONGODB_URI;

  // Create a storage object with a given configuration
  storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return {
        filename: Date.now() + '-' + file.originalname,
        bucketName: 'pdfs' // Collection name
      };
    }
  });
  
  upload = multer({ storage });
} else {
  // Fallback to disk storage if no MongoDB URI
  const diskStorage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  upload = multer({ storage: diskStorage });
}

const Course = require('../models/Course');

// Get all courses (with optional limit)
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find()
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ message: err.message });
  }
});

// Add PDF to course
router.post('/:id/pdf', upload.single('pdf'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    course.pdfId = req.file.id; // Store the file ID in the course
    await course.save();

    res.json(course);
  } catch (err) {
    console.error('Error uploading PDF:', err);
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to download PDF
router.get('/:id/pdf', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course || !course.pdfId) {
      return res.status(404).json({ message: 'PDF not found' });
    }

    const client = new MongoClient(mongoURI);
    await client.connect();
    const db = client.db();
    const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: 'pdfs' });

    bucket.openDownloadStream(course.pdfId).pipe(res);
  } catch (err) {
    console.error('Error downloading PDF:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;