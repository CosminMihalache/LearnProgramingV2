# Deploying to Vercel

This guide will help you deploy your Learn Programming application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (you can sign up for free using your GitHub account)
3. Your project pushed to a GitHub repository

## Deployment Steps

### 1. Push your project to GitHub

If you haven't already, create a new repository on GitHub and push your project:

```bash
# Initialize git if you haven't already
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/your-username/your-repo-name.git

# Push to GitHub
git push -u origin main
```

### 2. Install Vercel CLI (Optional)

For easier deployment and testing, you can install the Vercel CLI:

```bash
npm install -g vercel
```

### 3. Deploy to Vercel

#### Option 1: Using the Vercel Dashboard

1. Log in to your Vercel account (or create one at https://vercel.com)
2. Click "New Project" on the Vercel dashboard
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Leave as "Other"
   - Root Directory: Keep as default (the root of your repository)
   - Build Command: `npm run build`
   - Output Directory: `client/build`
5. Environment Variables:
   - Add the following environment variables:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `GOOGLE_AI_API_KEY`: Your Google AI API key (if applicable)
     - Any other environment variables used in your application
6. Click "Deploy"

#### Option 2: Using Vercel CLI

1. Navigate to your project directory
2. Run:
   ```bash
   vercel login
   vercel
   ```
3. Follow the prompts to configure your deployment
4. Set the environment variables when prompted, or later in the Vercel dashboard

### 4. Verify Deployment

Once deployment is complete:
1. Click on the generated URL to view your application
2. Test all functionality to ensure everything works correctly
3. Test the AI Lab page
4. Try the chatbot functionality to verify Google AI integration
5. Check course listings to verify MongoDB connection

## Troubleshooting

If you encounter issues:

1. **API Routes Not Working**: 
   - Check the Vercel logs in the dashboard
   - Verify that the `/api` folder is properly set up
   - Make sure environment variables are correctly set

2. **Database Connection Issues**: 
   - Verify your MongoDB Atlas connection string
   - Ensure your IP is whitelisted in MongoDB Atlas
   - Check that the connection options in `api/index.js` are correct

3. **Build Failures**: 
   - Check your build logs in the Vercel dashboard
   - Verify the build command and output directory settings
   - Make sure dependencies are properly listed in package.json

4. **Google AI Not Working**:
   - Verify the Google AI API key is correctly set in environment variables
   - Check rate limits on your Google AI account
   - Look for any errors in the network requests

## Updating Your Deployment

Any new changes pushed to your GitHub repository will automatically trigger a new deployment on Vercel if you have enabled auto-deployment.

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google AI API Documentation](https://ai.google.dev/)
- [Express.js Serverless Functions](https://vercel.com/guides/using-express-with-vercel)
