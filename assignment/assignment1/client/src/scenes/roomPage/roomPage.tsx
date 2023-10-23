// RoomPage.tsx
import Navbar from '../navBar';
import { Box } from '@mui/material';
import './roomPage.css'
import { deleteRoom, getRoomDetails } from "../../api/roomAPI";
import { saveAttemptedQns,saveCompletedQns } from "../../api/usersAPI/qnsHistAPI"
import { Room } from "../../state/room";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useEffect , useRef, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationPopup from './confirmationPopup';
import Chatbot from './Chatbot';
import {socket} from "../../App";
import Editor from './editor';
import CompleteQnsPopup from './completeQnsPopup';

const RoomPage = () => {
  const codeRef = useRef(null);

  const navigate = useNavigate();
  const {roomid} = useParams();
  const userId = useSelector((state: State) => state.user.id);
  const token = useSelector((state: State) => state.token);
  const [roomDetails, setRoomDetails] = useState<Room>();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  useEffect(() => {
    getRoom();
  }, []); 
  
  const getRoom = async () => {
    try {
      const data = await getRoomDetails(roomid ,token);
      setRoomDetails(data);
      const res = await saveAttemptedQns(data.question_id, userId, token);
    } catch (err) {
      console.log('Error fetching room details:', err);
    }
  };

  socket.on("leave_room_request", () => {
    deleteCurrentRoom();
  })
  
  const handleYesDelete = () => {
    socket.emit("leaving_room", roomid);
    deleteCurrentRoom();
  }
  const deleteCurrentRoom = async () => {
    try {
      if (roomDetails === undefined) {
        throw new Error("There is an error exiting, please try again later");
      } else {
        await deleteRoom(roomid, token);
        socket.emit("leave_room", roomid);
        setShowConfirmation(false);
        setShowComplete(true);
        navigate("/homePage");
      }
    } catch (err:any) {
      console.error('Error fetching room details:', err);
    }  
  }

  const confirmComplete = async () => {
    try {
      if (roomDetails === undefined) {
        throw new Error("There is an error completing the question");
      } else {
        const res = await saveCompletedQns(roomDetails.question_id, userId, token); //save qns as completed
        setShowComplete(false);
        navigate("/homePage");
      }
    } catch (err:any) {
      console.error('Error confirming complete', err);
    }
  }

  const handleDeleteRoom = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelComplete = () => {
    setShowComplete(false);
    navigate("/homePage");
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
<<<<<<< HEAD
        onConfirm={handleYesDelete} />
        <Box> <div className="leetcode-layout">
          <Chatbot/>
          </div>
        
        </Box>
     
=======
        onConfirm={deleteCurrentRoom} />
      <CompleteQnsPopup 
        open={showComplete}
        onClose={handleCancelComplete}
        onConfirm={confirmComplete} />
>>>>>>> milestone-2
      </Box>
    );
  }
  
  export default RoomPage;