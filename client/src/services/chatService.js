import axios from 'axios';

const API_URL = 'https://learnprogramingv2-1.onrender.com/api';

export const sendMessage = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}; 