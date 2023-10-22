
import { Box, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navBar";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Question } from "../../state/question";
import { getQuestionList } from '../../api/questionAPI/getQuestion';
import { createRoom, getRoomByDifficulty, updateRoom } from "../../api/roomAPI";
import {socket} from "../../App";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    const token = useSelector((state: State) => state.token);
    let quesdata:Question;
    let roomid:string;
    const username = useSelector((state: State) => state.user.username);

    // socket.once("create_room", async () => {
    //   console.log("CREATE ROOM");
    //   await getRandQuestion("easy");
    //   await createNewRoom();
    //   navigate(`/roomPage/${roomid}`);
    //   socket.emit("room_created", roomid);
    // });
    
    // socket.once("joined_room", async (roomid) => {
    //   navigate(`/roomPage/${roomid}`);
    // });

    const joinRoom= async (difficulty:string) => {
      // socket.emit("join_room");
      let rooms = await getRoomByDifficulty(difficulty, token);
      let joined = false;
      if (rooms.length != 0) {
        for (const room of rooms) {
          if(room.users.length < 2 && room.users.find((un:string) => un != username)) {
            updateRoom(room._id, username, token);
            socket.emit("join_room", room._id);
            navigate(`/roomPage/${room._id}`);
            joined = true;
            break;
          }
        }
        if(joined == false) {
          console.log(rooms);
          await getRandQuestion(difficulty);
          await createNewRoom();
          socket.emit("join_room", roomid);
          navigate(`/roomPage/${roomid}`);
        }
               
      } else {
        console.log(rooms);
        await getRandQuestion(difficulty);
        await createNewRoom();
        socket.emit("join_room", roomid);
        navigate(`/roomPage/${roomid}`);
      }
    }

    async function getRandQuestion(diff:string ) {
        
          const questionList:Question[] = await getQuestionList(token);
          const filteredQuestions = questionList.filter(question => question.difficulty === diff);
          quesdata=filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
    }

    const createNewRoom = async () => {
      const newData = {
        question_title: quesdata.title,
        question_difficulty: quesdata.difficulty,
        question_description: quesdata.description,
        question_examples: quesdata.examples,
        question_constraints: quesdata.constraints,
        users: [username],
      };
      const room = await createRoom(newData, token);
      roomid=room._id;
    };

    return (
      <Box>
        <Navbar />
        <Box
          width="100%"
          padding="2rem 6%"
          display={isNonMobileScreens ? "flex" : "block"}
          gap="0.5rem"
          justifyContent="space-between"
          flexDirection="column" // Change the direction to column
          alignItems="center" // Center align the items
          textAlign="center" // Center align text
        >
        <div>
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}
        fontSize={"20px"}>
          Welcome to PeerPrep, please pick a difficulty level
        </Typography>
        </div>
        <div>
        <button className="button-easy" onClick={() => { joinRoom("Easy");  } } >Easy </button>
        <button className="button-medium" onClick={async () => {await getRandQuestion("Medium"); await createNewRoom(); navigate(`/roomPage/${roomid}`); }} >Medium </button>
        <button className="button-hard" onClick={async () => {await getRandQuestion("Hard"); await createNewRoom(); navigate(`/roomPage/${roomid}`); }}>Hard</button>
        </div>
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
