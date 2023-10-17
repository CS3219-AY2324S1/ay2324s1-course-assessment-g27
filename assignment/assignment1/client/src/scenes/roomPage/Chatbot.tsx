import React, { useState, useEffect } from 'react';
import axios from 'axios';
const key = import.meta.env.VITE_API;

const Chatbot: React.FC = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const generateResponse = async (userMessage: string) => {
    setIsTyping(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + key,
          },
        }
      );

      const generatedText = response.data.choices[0]?.message?.content.trim();
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'bot', content: generatedText }]);
    } catch (error) {
      console.error(`Error during OpenAI API call: ${error.message}`);
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'bot', content: "Sorry, I encountered an error." }]);
    } finally {
      setIsTyping(false);
      setUserInput('');
    }
  };

  const handleUserInput = async () => {
    const userMessage = userInput.trim();

    if (userMessage.toLowerCase() === 'exit' || userMessage.toLowerCase() === 'bye') {
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'bot', content: 'Goodbye!' }]);
      setUserInput('');
      return;
    }

    await generateResponse(userMessage);
  };

  useEffect(() => {
    // Initial message when the component mounts
    setChatHistory([{ role: 'bot', content: "Hi! How may I help you today?" }]);
  }, []);

  return (
    <div>
      <div>
        {chatHistory.map((entry, index) => (
          <div key={index} className={entry.role === 'user' ? 'user-message' : 'bot-message'}>
            {entry.role === 'user' ? 'User: ' : 'Bot: '}
            {entry.content}
          </div>
        ))}
        {isTyping && <div>Bot is typing...</div>}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleUserInput();
          }
        }}
      />
      <button onClick={handleUserInput}>Send</button>
    </div>
  );
};

export default Chatbot;