
import { Box, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navBar";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { Question } from "../../state/question";
import { getQuestionList } from '../../api/questionAPI/getQuestion';
import { createRoom } from "../../api/roomAPI";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    const token = useSelector((state: State) => state.token);
    let quesdata:Question;
    let roomid:string;


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
        users: [""],
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
        {/* <button className="button-easy" onClick={() => {createNewRoom(); navigate("/" + roomData!._id);} } >Easy </button> */}
        {/* <button className="button-easy" onClick={() => navigate("/roomPage")} >Easy </button> */}
        <button className="button-easy" onClick={async () => {await getRandQuestion("easy"); await createNewRoom(); navigate(`/roomPage/${roomid}`); } } >Easy </button>
        {/* <button className="button-easy" onClick={() => {getRandQuestion("easy"); createNewRoom(); navigate("/roomPage");} } >Easy </button> */}
        {/* HELP THE NAVIGATE("ROOMPAGE") CAUSING CREATION OF ROOM TO HAVE 409 ERROR */}
        <button className="button-medium" onClick={async () => {await getRandQuestion("medium"); await createNewRoom(); navigate(`/roomPage/${roomid}`); }} >Medium </button>
        <button className="button-hard" onClick={async () => {await getRandQuestion("hard"); await createNewRoom(); navigate(`/roomPage/${roomid}`); }}>Hard</button>
        </div>
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
