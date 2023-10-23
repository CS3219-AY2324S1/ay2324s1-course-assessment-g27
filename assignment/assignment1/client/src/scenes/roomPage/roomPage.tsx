// RoomPage.tsx
import Navbar from '../navBar';
import { Box } from '@mui/material';
import './roomPage.css'
import { deleteRoom, getRoomDetails } from "../../api/roomAPI";
import { Room } from "../../state/room";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useEffect , useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationPopup from './confirmationPopup';
import Chatbot from './Chatbot';
import {socket} from "../../App";
import Editor from './editor';

const RoomPage = () => {
  const codeRef = useRef(null);

  const navigate = useNavigate();
  const {roomid} = useParams();
  const token = useSelector((state: State) => state.token);
  const [roomDetails, setRoomDetails] = useState<Room>();

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    getRoom();
  }, []); 
  const getRoom = async () => {
    try {
      const data = await getRoomDetails(roomid ,token);
      setRoomDetails(data);
    } catch (err) {
      console.error('Error fetching room details:', err);
    }
  };

  socket.on("leave_room_request", () => {
    deleteCurrentRoom();
  })
  const deleteCurrentRoom = async () => {
    await deleteRoom(roomid, token);
    socket.emit("leave_room", roomid);
    navigate("/homePage");
    // setShowConfirmation(false);
  }
  const handleYesDelete = () => {
    socket.emit("leaving_room", roomid);
    deleteCurrentRoom();
  }
  const handleDeleteRoom = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };
  return (
        <Box>
    <Navbar/>
      <button className="deleteRoom-button" onClick={() => handleDeleteRoom()}> Close Room </button>

      <div className="leetcode-layout">
        <div className="questions-panel">
          <h2>{roomDetails?.question_title}</h2>
          <p>{roomDetails?.question_description}</p>
          <h3>Examples:</h3>
          <div className='pre-background'>
          <pre>{roomDetails?.question_examples?.map((i, index) => "Example " + (index+1) + "\n" +
                                                          "Inputs: " + i.inputText + "\n" +
                                                          "Outputs: " + i.outputText + "\n" + 
                                                          "Explanation: " + i.explanation + "\n \n") }</pre>
          </div>
        </div>
        {/* <div className="code-editor">
          <textarea id="codeEditor" placeholder="Write your code here"></textarea>
        </div> */}
        <div id='codeEditor' style={{width:"1000px", height:"800px", padding:"10px", paddingTop:"0"}}>
          <Editor socket={socket} roomId={roomid}/>
        </div>
        
      </div>
      <ConfirmationPopup 
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleYesDelete} />
        <Box> <div className="leetcode-layout">
          <Chatbot/>
          </div>
        
        </Box>
     
      </Box>
    );
  }
  
  export default RoomPage;