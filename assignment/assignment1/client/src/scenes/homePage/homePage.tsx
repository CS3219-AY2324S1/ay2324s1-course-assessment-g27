
import { Box, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navBar";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../state";
import {socket} from "../../App";
import { useState } from "react";
import CircularWithValueLabel from "./matchLoadingPage";
import { Theme } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
    const username = useSelector((state: State) => state.user.username);
    const token = useSelector((state: State) => state.token);
    let timeOut:any;
    const theme: Theme = useTheme();
    const primaryLight = theme.palette.primary.light;
    const primaryDark = theme.palette.primary.dark;
    
    const [isMatching, setIsMatching] = useState<Boolean>(false);

    const createMatch = (difficulty:string) => {
      socket.emit("find_match", {username:username, difficulty: difficulty, token:token});
      setIsMatching(true);
      timeOut = setTimeout(matchTimout, 33 * 1000);
    }

    socket.on("successMatch", async (roomId) => {
      socket.emit("join_room", roomId);
      clearTimeout(timeOut);
      navigate(`/roomPage/${roomId}`);
    })

    const matchTimout = () => {
      setIsMatching(false);
      window.location.reload();
    }

    const onCancelButton = () => {
      setIsMatching(false);
      window.location.reload();
    }

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
        <Typography fontWeight="bold" variant="h5" fontSize={"25px"} fontFamily={'Trebuchet MS'}
        sx= {{ backgroundImage: theme.palette.mode === "dark" ? 
        `linear-gradient(45deg, ${primaryLight}, #fa57e2)`:
        `linear-gradient(45deg, ${primaryDark}, #5d00fc)`,
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        mb: "1.5rem"}}>
          Welcome to PeerPrep, Please pick a Difficulty Level
        </Typography>
        </div>
        { isMatching ? <CircularWithValueLabel onCancel={onCancelButton}/> :
          <div>
          <button className="button-easy" onClick={() => { createMatch("Easy");  } } >Easy </button>
          <button className="button-medium" onClick={async () => {createMatch("Medium"); }} >Medium </button>
          <button className="button-hard" onClick={async () => {createMatch("Hard"); }}>Hard</button>
          </div>
        }
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
