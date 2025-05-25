// Specialized Vercel serverless handler
const app = require('./index');

module.exports = (req, res) => {
  // This adapter function allows Express to work as a Vercel serverless function
  return app(req, res);
};
