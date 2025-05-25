# Vercel Deployment Setup

This project has been configured for deployment on Vercel. Here's a summary of the changes made:

## Configuration Files Added

1. `vercel.json` - Main configuration file for Vercel deployment
2. `/api/index.js` - Serverless Express app for API routes
3. `/api/serverless.js` - Vercel serverless function adapter
4. `.env.example` - Template for required environment variables
5. `VERCEL_DEPLOYMENT.md` - Detailed deployment guide

## Changes Made

1. **API Services**
   - Updated client-side API URLs to use relative paths in production
   - Configured CORS to allow Vercel domains

2. **Server Configuration**
   - Optimized MongoDB connection for serverless environment
   - Created dedicated API folder for Vercel serverless functions

3. **Build Configuration**
   - Updated package.json scripts for Vercel deployment
   - Configured proper build settings in vercel.json

## Next Steps

1. **Push to GitHub**
   - Create a new GitHub repository
   - Push your code to the repository

2. **Deploy to Vercel**
   - Sign up for Vercel (if you haven't already)
   - Connect your GitHub repository
   - Set required environment variables
   - Deploy the application

3. **Post-Deployment**
   - Test all functionality in the deployed application
   - Verify MongoDB connection
   - Check Google AI integration
   - Test the new AI Lab page

For detailed deployment instructions, please refer to `VERCEL_DEPLOYMENT.md`.

## Important Notes

- **Environment Variables**: Make sure to set up the required environment variables in Vercel
- **Database Connection**: Ensure your MongoDB Atlas connection string is correct and your IP is whitelisted
- **Serverless Limitations**: Be aware of serverless function execution time limits

If you encounter any issues, check the Vercel logs in the dashboard and refer to the troubleshooting section in the deployment guide.
