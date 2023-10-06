// RoomPage.tsx
import Navbar from '../navBar';
import { Box } from '@mui/material';
import './roomPage.css'
import { deleteRoom, getRoomDetails } from "../../api/roomAPI";
import { Room } from "../../state/room";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useEffect , useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationPopup from './confirmationpopup';





const RoomPage = () => {
  const navigate = useNavigate();
  const {roomid} = useParams();
  const token = useSelector((state: State) => state.token);
  const [roomDetails, setRoomDetails] = useState<Partial<Room>>();

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Fetch the room details when the component mounts
    getRoom();
  }, []); // Empty dependency array means this effect runs once on mount
  const getRoom = async () => {
    try {
      const data = await getRoomDetails(roomid ,token);
      setRoomDetails(data);
    } catch (err) {
      console.error('Error fetching room details:', err);
    }
  };
  // console.log(roomDetails);

  const deleteCurrentRoom = () => {
      deleteRoom(roomid, token);
      navigate("/homePage");
      setShowConfirmation(false);
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
          {/* Place your questions or problem statements here */}
          {/* <h2>Question 1 </h2> */}
          <h2>{roomDetails?.question_title}</h2>
          {/* <p>This is the problem statement for Question 1.</p> */}
          <p>{roomDetails?.question_description}</p>
          <h3>Example 1:</h3>
          <div className='pre-background'>
          <pre>{roomDetails?.question_examples?.flatMap(i => i.toString() + "\n")}</pre>
          {/* Add more questions as needed */}
          </div>
        </div>
        <div className="code-editor">
          {/* Code editor component goes here */}
          <textarea placeholder="Write your code here"></textarea>
        </div>
      </div>
      <ConfirmationPopup 
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={deleteCurrentRoom} />
      </Box>
    );
  }
  
  export default RoomPage;