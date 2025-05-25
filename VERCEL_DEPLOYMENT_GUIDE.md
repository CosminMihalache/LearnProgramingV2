# Vercel Deployment Guide for Learn Programming Platform

This guide will walk you through deploying your Learn Programming platform to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com using your GitHub account)
3. Your GitHub repository (LearnProgramingV2)
4. MongoDB Atlas account for database hosting
5. Google AI API key for the chatbot functionality

## Deployment Steps

### 1. Prepare Your Project

You've already:
- Fixed ESLint errors in the codebase
- Configured proper Vercel deployment settings in `vercel.json`
- Set up serverless API handling in the `/api` directory
- Updated client API endpoints to use relative paths in production

### 2. Deploy to Vercel

1. **Login to Vercel**:
   - Go to https://vercel.com and sign in with your GitHub account

2. **Import Your Project**:
   - Click on "Add New..." → "Project"
   - Select your GitHub account
   - Find and select the "LearnProgramingV2" repository
   - If you don't see it, you may need to configure Vercel to access your repository

3. **Configure Project Settings**:
   - **Framework Preset**: Select "Other"
   - **Root Directory**: Leave as the default (the root of your repository)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/build`

4. **Configure Environment Variables**:
   - Click "Environment Variables" to expand this section
   - Add the following variables:
     ```
     MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database
     GOOGLE_AI_API_KEY=your_google_ai_api_key
     NODE_ENV=production
     ```
   - Replace the placeholders with your actual MongoDB connection string and Google AI API key

5. **Deploy**:
   - Click "Deploy"
   - Vercel will start the deployment process and provide you with deployment logs
   - This will take a few minutes

### 3. Verify Your Deployment

1. **Access Your Application**:
   - Once deployment is complete, Vercel will provide a URL (e.g., https://learn-programming-v2.vercel.app)
   - Click on this URL to view your deployed application

2. **Test Key Functionality**:
   - Navigation and page loading
   - AI Lab page
   - Course listings (requires MongoDB connection)
   - Chat functionality (requires Google AI API)

### 4. Add a Custom Domain (Optional)

1. **In Vercel Dashboard**:
   - Go to your project settings
   - Click on "Domains"
   - Add your custom domain and follow the verification process

### 5. Ongoing Maintenance

1. **Updates and Changes**:
   - Make changes to your local repository
   - Commit and push to GitHub
   - Vercel will automatically redeploy your application

2. **Monitoring**:
   - Use the Vercel dashboard to monitor your application
   - Check logs for any errors or issues

## Troubleshooting

### Build Failures
- Check your build logs in the Vercel dashboard
- Ensure all dependencies are properly installed
- Verify your environment variables are correctly set

### API or Database Issues
- Check if your MongoDB Atlas connection string is correct
- Ensure your Google AI API key is valid
- Verify CORS settings if you're seeing cross-origin errors

### Performance Issues
- Consider implementing caching for database queries
- Optimize image sizes
- Use code splitting for better load times

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google AI API Documentation](https://ai.google.dev/docs)
