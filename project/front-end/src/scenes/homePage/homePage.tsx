
import { Box, useMediaQuery, Typography, FormControl,FormControlLabel,FormLabel, Radio, RadioGroup } from "@mui/material";
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
import {LANGUAGE} from "../../constants/constants"

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
    const [selectedDifficulty, setSelectedDifficulty] = useState<String>("Easy");
    const [selectedLanguage, setSelectedLanguage] = useState<String>("javascript");

    const createMatch = () => {
      socket.emit("find_match", {username:username, difficulty: selectedDifficulty, language:selectedLanguage, token:token});
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

    const onChangeDifficulty = (event:any) => {
      setSelectedDifficulty(event.target.value);
    }

    const onChangeLanguage = (event:any) => {
      setSelectedLanguage(event.target.value);
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
        
        { isMatching ? <CircularWithValueLabel onCancel={onCancelButton}/> :
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
            <div className="container">
              <div className="radio-tile-group">
                <div className="input-container">
                  <input type="radio" name="difficulty-radio" value={"Easy"}  defaultChecked={selectedDifficulty === "Easy"}
                    onChange={onChangeDifficulty}/>
                  <div className="button-easy">
                    <label>Easy</label>
                  </div>
                </div>

                <div className="input-container">
                  <input type="radio" name="difficulty-radio" value={"Medium"}  defaultChecked={selectedDifficulty === "Medium"}
                    onChange={onChangeDifficulty}/>
                  <div className="button-medium">
                    <label>Medium</label>
                  </div>
                </div>

                <div className="input-container">
                  <input type="radio" name="difficulty-radio" value={"Hard"}  defaultChecked={selectedDifficulty === "Hard"}
                    onChange={onChangeDifficulty}/>
                  <div className="button-hard">
                    <label>Hard</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="container">
              <div className="radio-tile-group">
              {(Object.keys(LANGUAGE) as (keyof typeof LANGUAGE)[]).map((key, index) => {
                  return (
                    <div className="input-container">
                      <input type="radio" name="lang-radio" value={LANGUAGE[key]} checked={selectedLanguage === LANGUAGE[key]}
                        onChange={onChangeLanguage}/>
                      <div className="button-language">
                        <label>{key}</label>
                      </div>
                    </div>
                  )
                })
              }
              </div>
            </div>
            <div>
            <button className="button-easy" onClick={() => { createMatch();  } } >Lets Match </button>
            </div>
          </div>
        }
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
