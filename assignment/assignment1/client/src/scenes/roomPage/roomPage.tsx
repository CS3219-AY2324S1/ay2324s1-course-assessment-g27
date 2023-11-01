// RoomPage.tsx
import Navbar from '../navBar';
import { Box, Fab } from '@mui/material';
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
import { DisplayDescriptionInRoom } from '../widgets/DisplayQuestionInformation';
import CircularProgress from '@mui/material/CircularProgress';
import AssistantIcon from '@mui/icons-material/Assistant';
import Chat from './Chat';

const RoomPage = () => {

  const navigate = useNavigate();
  const {roomid} = useParams();
  const userId = useSelector((state: State) => state.user.id);
  const token = useSelector((state: State) => state.token);
  const EmptyRoom: Room = {
    _id: "",
    question_id:"",
    users: []
  };
  const [roomDetails, setRoomDetails] = useState<Room>();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [showChatText, setShowChatText] = useState(false);

  const [attempt, setAttempt] = useState<String>('');

  const handleMouseOver = () => {
    setShowChatText(true);
  };

  const handleMouseLeave = () => {
    setShowChatText(false);
  };

  const handleAttempt = (attempt: String) => {
    setAttempt(attempt);
  }

  useEffect(() => {
    getRoom();
  }, []); 
  
  const getRoom = async () => {
    try {
      const data = await getRoomDetails(roomid ,token);
      setRoomDetails(await getRoomDetails(roomid ,token));
    } catch (err) {
      console.log('Error fetching room details:', err);
      navigate("/homePage");
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
        setShowConfirmation(false);
        setShowComplete(true);
        socket.emit("leave_room", roomid);
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
        const res = await saveCompletedQns(attempt, roomDetails.question_id, userId, token); //save qns as completed
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

  const handleCancelComplete = async () => {
    setShowComplete(false);
    try {
      const res = await saveAttemptedQns(attempt, roomDetails.question_id, userId, token);
    } catch (err:any) {
      console.log(err.message);
    } finally {
      navigate("/homePage");
    }
  };

  const openChat = () => {
    setShowChat(true);
  }
  const closeChat = () => {
    setShowChat(false);
  }
  if (!roomid) {
    // Handle the case when roomid is undefined
    return <div>No room id provided</div>;
  }
  return (
        <Box>
    <Navbar/>
      <button className="deleteRoom-button" onClick={() => handleDeleteRoom()}> Close Room </button>

      <div className="leetcode-layout" style={{ width:"100%", height:"90vh", display: 'flex', flexWrap: 'wrap' }}>
        { (!roomDetails) ? <div><CircularProgress /></div> :
        <DisplayDescriptionInRoom 
          roomDetails = {roomDetails}/>
        }
        <div id='codeEditor' style={{flex: '1', minHeight:"80%", maxHeight:"80%", minWidth: '50%', maxWidth: '50%', padding:"10px", paddingTop:"0"}}>
          <Editor saveAttempt={handleAttempt} socket={socket} roomId={roomid}/>
        </div> 

        <div className='chat-container'><Chat socket={socket} roomid={roomid} /> </div>
      </div>
      {showChatText && <div className="chat-text" placeholder='CHAT'>Show Chatbot</div>}

      <Chatbot
        open={showChat}
        onClose={closeChat}/>
      <ConfirmationPopup 
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleYesDelete} />
     
      <CompleteQnsPopup 
        open={showComplete}
        onClose={handleCancelComplete}
        onConfirm={confirmComplete} />
      <Fab id="ChatBotButton" size="large" 
      style={{position:"fixed", right:"10px", bottom:"8px"}} onClick={() => openChat()}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}>
        <AssistantIcon/>
      </Fab>
      </Box>
    );
  }
  
  export default RoomPage;