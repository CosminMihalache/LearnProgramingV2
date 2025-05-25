import React, { useState, useEffect, useRef } from 'react';
import { sendMessage } from '../services/chatService';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const notificationSound = useRef(null);
  const messagesEndRef = useRef(null);
  const initialSoundPlayed = useRef(false); // Ref to track if initial sound has played

  useEffect(() => {
    // Initialize audio with preload
    const audio = new Audio('/notification.mp3');
    audio.preload = 'auto';
    audio.volume = 0.5;
    notificationSound.current = audio;
    
    const handleCanPlayThrough = () => {
      setAudioLoaded(true);
    };

    notificationSound.current.addEventListener('canplaythrough', handleCanPlayThrough);
    notificationSound.current.load();

    // Send initial greeting
    const sendInitialGreeting = async () => {
      setIsTyping(true);
      try {
        const response = await sendMessage('Hello! I am your virtual assistant. How can I help you today?');
        setMessages([{ text: response.message, sender: 'bot' }]);
        setUnreadCount(1);
        // Sound playing logic moved to another useEffect
      } catch (error) {
        console.error('Error sending initial greeting:', error);
        setMessages(prev => [...prev, { text: 'Failed to connect to the assistant. Please try again later.', sender: 'bot' }]);
      } finally {
        setIsTyping(false);
      }
    };

    sendInitialGreeting();

    return () => {
      if (notificationSound.current) {
        notificationSound.current.removeEventListener('canplaythrough', handleCanPlayThrough);
      }
    };
  }, []); // This effect runs once on mount

  // Effect to play sound for the initial bot message
  useEffect(() => {
    if (messages.length > 0 && messages[0].sender === 'bot' && audioLoaded && notificationSound.current && !initialSoundPlayed.current) {
      notificationSound.current.play().catch(error => console.error("Error playing notification sound:", error));
      initialSoundPlayed.current = true;
    }
  }, [messages, audioLoaded]); // Dependencies: messages and audioLoaded

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    const userMessage = { text: currentMessage, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    try {
      const response = await sendMessage(currentMessage);
      setMessages(prev => [...prev, { text: response.message, sender: 'bot' }]);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
        // Play sound for subsequent bot messages if chat is closed and audio is loaded
        if (audioLoaded && notificationSound.current) {
          notificationSound.current.play().catch(error => console.error("Error playing notification sound:", error));
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, an error occurred. Please try again.', 
        sender: 'bot' 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chatbot-container">
      <button className="chatbot-toggle" onClick={toggleChat}>
        <span className="chat-icon">💬</span>
        {unreadCount > 0 && !isOpen && (
          <span className="unread-indicator">{unreadCount}</span>
        )}
      </button>

      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Chat Assistant</h3>
          <button className="close-button" onClick={toggleChat}>×</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chatbot-input" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit" disabled={isTyping}>Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;