// RoomPage.tsx

import React from 'react';
import Navbar from '../navBar';
import { Box } from '@mui/material';

import './roomPage.css'
function RoomPage() {
    return (
        <Box>
    <Navbar/>
      <div className="leetcode-layout">
        <div className="questions-panel">
          {/* Place your questions or problem statements here */}
          <h2>Question 1</h2>
          <p>This is the problem statement for Question 1.</p>
          <h3>Example 1:</h3>
          <div className='pre-background'>
          <pre>Input: wheeee</pre>
          <pre>Output: wheee</pre>
          <pre>Explanation: </pre>
          {/* Add more questions as needed */}
          </div>
        </div>
        <div className="code-editor">
          {/* Code editor component goes here */}
          <textarea placeholder="Write your code here"></textarea>
        </div>
      </div>
      </Box>
    );
  }
  
  export default RoomPage;