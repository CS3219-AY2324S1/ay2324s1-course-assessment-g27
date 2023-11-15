import React, { useEffect, useState, useRef } from 'react';
import { Socket } from 'socket.io-client';
import './Chat.css';

type ChatProps = {
  socket: Socket;
  roomid: string;
};

const Chat: React.FC<ChatProps> = ({ socket, roomid }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isSent: boolean }[]>([]);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Event listener for receiving messages
    socket.on('chat_message', (data: string) => {
      // When a message is received, add it to the state with isSent set to false
      setMessages((prevMessages) => [...prevMessages, { text: data, isSent: false }]);
    });

    // Scroll to the bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }

    return () => {
      // Clean up the event listener when the component unmounts
      socket.off('chat_message');
    };
  }, [socket, messages]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      // When sending a message, add it to the state with isSent set to true
      setMessages((prevMessages) => [...prevMessages, { text: message, isSent: true }]);
      socket.emit('send_message', roomid, message);
      setMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevents adding a newline in the input
      sendMessage();
    }
  };

  return (
    <div className="chat-container" ref={chatContainerRef}>
      <div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.isSent ? 'sent' : 'received'}` }>
            {msg.text}
          </div>
        ))}
        </div>
        <div className='input-chat'>
        <input
          type="text"
         
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      </div>
      
    </div>
    
  );
};

export default Chat;
