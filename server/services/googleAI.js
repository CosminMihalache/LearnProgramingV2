const { GoogleGenerativeAI } = require("@google/generative-ai");

// Check if API key exists
if (!process.env.GOOGLE_AI_API_KEY) {
  console.warn('GOOGLE_AI_API_KEY is not defined in environment variables');
  console.warn('AI chat functionality will not work properly');
  // Continue without exiting to allow other functionality to work
}

// Initialize the AI model only if API key is available
const genAI = process.env.GOOGLE_AI_API_KEY ? 
  new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY) : null;

// Define the chat model - Use the model that we know works
let model = null;

if (genAI) {
  try {
    model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
      generationConfig: {
        maxOutputTokens: 200,
        temperature: 0.7,
      }
    });
    console.log('AI model initialized successfully');
  } catch (error) {
    console.error('Error initializing AI model:', error);
  }
}

// English context for the AI
const systemContext = `
You are an AI assistant for an educational platform that teaches programming and artificial intelligence.
Your role is to:
- Help users learn programming concepts
- Provide information about our courses (Python, JavaScript, AI)
- Give clear and concise explanations
- Be friendly and encouraging
- Respond in English
- If you don't understand a question, politely ask for clarification

Important: All your responses MUST be in English, regardless of the language in which you receive the question.
`;

async function generateResponse(prompt) {
  try {
    if (!model) {
      return 'AI service is currently unavailable. The model could not be initialized. Please check the API configuration.';
    }
    
    const fullPrompt = `${systemContext}\n\nQuestion: ${prompt}\n\nAnswer:`;
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Google AI Error:', error);
    return 'I\'m sorry, I encountered an error when communicating with the AI service. Please try again later.';
  }
}

module.exports = { generateResponse }; 