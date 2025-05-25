import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://learn-programing-v2-wd5a.vercel.app/api'
  : 'http://localhost:5001/api';

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 