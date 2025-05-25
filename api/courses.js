const mongoose = require('mongoose');
const Course = require('../server/models/Course');

// Connect to MongoDB if not already connected
if (!mongoose.connection.readyState && process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const courses = await Course.find().sort({ createdAt: -1 }).exec();
      res.status(200).json(courses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch courses', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
