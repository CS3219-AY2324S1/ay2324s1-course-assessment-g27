import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Modal, Box, Fab, styled, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import "./Chatbot.css"
import { Theme } from '@mui/system';


const key = import.meta.env.VITE_API;

interface ChatbotProps {
  open:boolean;
  onClose: (event: object, reason: string) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({open, onClose}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const theme:Theme = useTheme();
  

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
      setChatHistory(prevChatHistory => [...prevChatHistory, { role: 'bot', content: generatedText }]);
    } catch (error:any) {
      console.error(`Error during OpenAI API call: ${error.message}`);
      setChatHistory([...chatHistory, { role: 'bot', content: "Sorry, I encountered an error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleUserInput = async () => {
    const userMessage = userInput.trim();

    if (userMessage.toLowerCase() === 'exit' || userMessage.toLowerCase() === 'bye') {
      setChatHistory([...chatHistory, { role: 'user', content: userMessage }, { role: 'bot', content: 'Goodbye!' }]);
      setUserInput('');
      return;
    }
    setChatHistory([...chatHistory, { role: 'user', content: userMessage }]);
    setUserInput('');
    await generateResponse(userMessage);
  };

  useEffect(() => {
    setChatHistory([{ role: 'bot', content: "Hi! How may I help you today?" }]);
  }, []);
  
  const CustomFab = styled(Fab)(() => ({
      position:"absolute",
      backgroundColor:"#5aa6f8",
      color:"#000", 
      top:"8px", 
      right:"8px", 
      borderRadius:"100%",

  }));

  const formatCodeBlocks = (content:any) => {
    const codeBlockRegex = /```([\s\S]+?)```/g;
    const splitted = content.split(codeBlockRegex);
    return splitted.map((segment:any, index:any) => {
      if(index % 2 == 0) {
        return <div key={index}>{segment}</div>
      } else {
        return <SyntaxHighlighter key={index} language="javascript" style={dracula}>
          {segment}
        </SyntaxHighlighter>
      }
    })
  }
 

  return (
    <Modal
      sx={{
      width: 500,
      height: 500,
      }}
      open={open}
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          onClose(event, reason);
        }
      }}
      aria-labelledby="chatbot-modal-title"
      aria-describedby="chatbot-modal-description"
      disablePortal ={true}
      keepMounted
      closeAfterTransition
      disableAutoFocus={true}
      disableEnforceFocus={true}
      style={{top:"48%", left:"72%"}}
      BackdropProps={{
        style: {
          pointerEvents: 'none',
          backdropFilter: 'blur(0)', 
          background:'none',
          color:'none'
        }
      }}
      
    >
        <Box className="chatbot-modal" 
        sx={{
        width: 500,
        height: 500,
        backgroundColor: theme.palette.mode === "dark" ? "#205287" : '#95c5f8',
        borderRadius:'15px',
        position: 'fixed',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        }}>
          <div className="chatbot-content" >
          <div className="chat-history">
            {chatHistory.map((entry, index) => (
              <div key={index} className={entry.role === 'user' ? 
              `user-message${theme.palette.mode === 'dark' ? 
              'dark-mode' : ''}` : `bot-message${theme.palette.mode === 'dark' ? 'dark-mode' : ''}`}>
                {entry.role === 'user' ? (<> <PersonIcon/>: </>) : (<> <SmartToyIcon/>: </>)}
                {formatCodeBlocks(entry.content)}
              </div>
            ))}
            {isTyping && <div>Bot is typing...</div>}
          </div>
            <div className="chat-input"style={{position:"relative", top:"2.8%"}}>
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
          </div>
          <CustomFab className="close-button" size="small"
          onClick={(event) => onClose(event, 'buttonClick')}>
          <CloseIcon/>
          </CustomFab>
        </Box>
    </Modal>
  );
};

export default Chatbot;