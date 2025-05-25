# Learn Programming Platform

A web application for learning programming languages and AI concepts.

## Project Overview

This is a full-stack web application with:
- React frontend
- Node.js/Express backend
- MongoDB database
- Google Generative AI integration for an AI chatbot assistant

## Prerequisites

- Node.js (>= 18.x)
- npm
- MongoDB (optional for development)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   npm run install-client
   npm run install-server
   ```

3. Configure environment variables:
   - Create a `.env` file in the server folder with the following variables:
   ```
   PORT=5001
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster-url/your-database
   GOOGLE_AI_API_KEY=your-google-ai-api-key-here
   ```
   Note: 
   - You can use a local MongoDB instance or MongoDB Atlas for the database connection.
   - For the Google AI API key, you'll need to create one in the Google AI Studio (https://ai.google.dev/)
   - The application uses the "gemini-1.5-flash-latest" model.

4. Start the development server:
   ```
   npm run dev
   ```
   This will start both the backend server (port 5001) and frontend client (port 3000).

5. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001/api

## Features

- Course catalog for programming languages
- Detailed course pages
- AI-powered chatbot assistant (requires Google AI API key)
  - Rate limited to 5 requests per minute to prevent quota issues
- Responsive design for desktop and mobile

## Deployment

The application is configured for deployment on Render.com or similar platforms.

## License

This project is licensed under the MIT License.
