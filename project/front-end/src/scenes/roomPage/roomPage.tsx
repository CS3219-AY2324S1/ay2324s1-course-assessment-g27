// RoomPage.tsx
import Navbar from "../navBar";
import { Box, Fab } from "@mui/material";
import "./roomPage.css";
import { deleteRoom, getRoomDetails } from "../../api/roomAPI";
import { saveAttemptedQns, completeQns } from "../../api/usersAPI/qnsHistAPI";
import { Room } from "../../state/room";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationPopup from "./confirmationPopup";
import Chatbot from "./Chatbot";
import Editor from "./editor";
import { roomSocket } from "../../App";
import CompleteQnsPopup from "./completeQnsPopup";
import { DisplayDescriptionInRoom } from "../widgets/DisplayQuestionInformation";
import CircularProgress from "@mui/material/CircularProgress";
import AssistantIcon from "@mui/icons-material/Assistant";
import Chat from "./Chat";
import { codeExec } from "../../api/codeAPI";
import ExecutionResultDiv from "../widgets/ExecutionResultDiv";

const RoomPage = () => {
  const navigate = useNavigate();
  const { roomid } = useParams();
  const userId = useSelector((state: State) => state.user.id);
  const token = useSelector((state: State) => state.token);
  const [roomDetails, setRoomDetails] = useState<Room>();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const [showChat, setShowChat] = useState(false);
  const [showChatText, setShowChatText] = useState(false);
  const [attempt, setAttempt] = useState<string>("");

  const initOutput = {
    output: "",
    cpuTime: "",
  };

  const [output, setOutput] = useState(initOutput);

  const handleMouseOver = () => {
    setShowChatText(true);
  };

  const handleMouseLeave = () => {
    setShowChatText(false);
  };

  const handleAttempt = (attempt: string) => {
    setAttempt(attempt);
    console.log("handle attempt: ", attempt);
  };

  useEffect(() => {
    roomSocket.emit("join_room", roomid);
    roomSocket.on("user_exceed", () => {
      navigate("/homePage");
    });
    getRoom();
  }, []);

  const getRoom = async () => {
    try {
      const data = await getRoomDetails(roomid, token);
      setRoomDetails(data);
      const res = await completeQns(false, data.question_id, userId, token);
    } catch (err) {
      console.log("Error fetching room details:", err);
      navigate("/homePage");
    }
  };

  roomSocket.on("leave_room_request", () => {
    deleteCurrentRoom();
  });

  const handleYesDelete = () => {
    roomSocket.emit("leaving_room", roomid);
    deleteCurrentRoom();
  };
  const deleteCurrentRoom = async () => {
    try {
      if (roomDetails === undefined) {
        throw new Error("There is an error exiting, please try again later");
      } else {
        await deleteRoom(roomid, token);
        console.log("delete room attempt: ", attempt);
        setShowConfirmation(false);
        setShowComplete(true);
        roomSocket.emit("leave_room", roomid);
        // const res = await saveAttemptedQns(attempt, roomDetails.question_id, userId, token);
      }
    } catch (err: any) {
      console.error("Error fetching room details:", err);
    }
  };

  const confirmComplete = async () => {
    try {
      if (roomDetails === undefined) {
        throw new Error("There is an error completing the question");
      } else {
        const saveAttempt = await saveAttemptedQns(
          attempt,
          roomDetails.question_id,
          userId,
          token
        );
        const complete = await completeQns(
          true,
          roomDetails.question_id,
          userId,
          token
        ); //save qns as completed
        navigate("/homePage");
      }
    } catch (err: any) {
      console.error("Error confirming complete", err);
    } finally {
      navigate("/homePage");
    }
  };

  const handleDeleteRoom = () => {
    setShowConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
  };

  const handleCancelComplete = async () => {
    setShowComplete(false);
    try {
      if (roomDetails === undefined) {
        throw new Error("There is an error completing the question");
      } else {
        const res = await saveAttemptedQns(
          attempt,
          roomDetails.question_id,
          userId,
          token
        );
        navigate("/homePage");
      }
    } catch (err: any) {
      console.error("Error saving attempt", err);
    } finally {
      navigate("/homePage");
    }
  };

  const openChat = () => {
    setShowChat(true);
  };
  const closeChat = () => {
    setShowChat(false);
  };
  if (!roomid) {
    // Handle the case when roomid is undefined
    return <div>No room id provided</div>;
  } else if (!roomDetails) {
    return <div>Loading Room...</div>;
  }

  const handleExecCode = async () => {
    try {
      setOutput({ cpuTime: "", output: "Executing..." });
      console.log("getting response from codeExec...");
      const response = await codeExec(
        roomDetails.language == "javascript"
          ? "nodejs"
          : roomDetails.language == "python"
          ? "python3"
          : "java",
        attempt,
        token
      );
      setOutput(initOutput);

      if (response.status === 200) {
        const responseData = await response.json();
        setOutput({
          cpuTime: responseData.cpuTime,
          output: responseData.output,
        });
      } else {
        console.error("Error executing code:", response.statusText);
      }
    } catch (err) {
      console.error("Error executing code:", err);
      setOutput(initOutput);
      return;
    }
  };

  return (
    <Box>
      <Navbar />
      <button className="deleteRoom-button" onClick={() => handleDeleteRoom()}>
        {" "}
        Close Room{" "}
      </button>
      <button className="executeCode-button" onClick={() => handleExecCode()}>
        {" "}
        Run Code{" "}
      </button>

      <div
        className="leetcode-layout"
        style={{
          width: "100%",
          height: "90vh",
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {!roomDetails ? (
          <div>
            <CircularProgress />
          </div>
        ) : (
          <DisplayDescriptionInRoom roomDetails={roomDetails} />
        )}
        <div
          id="codeEditor"
          style={{
            flex: "1",
            minWidth: "50%",
            maxWidth: "50%",
            padding: "10px",
            paddingTop: "0",
            maxHeight: "85%",
          }}
        >
          <Editor
            socket={roomSocket}
            roomId={roomid}
            saveAttempt={handleAttempt}
            selectedLanguage={roomDetails.language}
          />
          <ExecutionResultDiv output={output} />
        </div>
        <div className="chat-container">
          <Chat socket={roomSocket} roomid={roomid} />{" "}
        </div>
      </div>
      {showChatText && (
        <div className="chat-text" placeholder="CHAT">
          Show Chatbot
        </div>
      )}

      <Chatbot open={showChat} onClose={closeChat} />
      <ConfirmationPopup
        open={showConfirmation}
        onClose={handleCancelDelete}
        onConfirm={handleYesDelete}
      />

      <CompleteQnsPopup
        open={showComplete}
        onClose={handleCancelComplete}
        onConfirm={confirmComplete}
      />

      <Fab
        id="ChatBotButton"
        size="large"
        style={{ position: "fixed", right: "10px", bottom: "8px" }}
        onClick={() => openChat()}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <AssistantIcon />
      </Fab>
    </Box>
  );
};

export default RoomPage;
