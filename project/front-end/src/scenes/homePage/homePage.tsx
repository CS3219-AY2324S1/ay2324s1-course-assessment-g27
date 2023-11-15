
import { Box, useMediaQuery, Typography} from "@mui/material";
import Navbar from "../navBar";
import "./homePage.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../state";
import { useState } from "react";
import {matchSocket} from "../../App";
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
      matchSocket.emit("find_match", {username:username, difficulty: selectedDifficulty, language:selectedLanguage, token:token});
      setIsMatching(true);
      timeOut = setTimeout(matchTimout, 33 * 1000);
    }

    matchSocket.on("successMatch", async (roomId) => {
      clearTimeout(timeOut);
      navigate(`/roomPage/${roomId}`);
    })

    const matchTimout = () => {
      window.location.reload();
      setIsMatching(false);
    }

    const onCancelButton = () => {
      window.location.reload();
      setIsMatching(false);
    }

    const onChangeDifficulty = (event:any) => {
      setSelectedDifficulty(event.target.value);
    }

    const onChangeLanguage = (event:any) => {
      setSelectedLanguage(event.target.value);
    }

    const DisplayTextCSS = {
      backgroundImage: theme.palette.mode === "dark" ? 
        `linear-gradient(45deg, ${primaryLight}, #fa57e2)`:
        `linear-gradient(45deg, ${primaryDark}, #5d00fc)`,
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      mb: "1.5rem"
    };

    return (
      <Box>
        <Navbar inRoomStatus={false}/>
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
            sx= {{...DisplayTextCSS}}>
            Welcome to PeerPrep, start matching with your peers and prepping for interviews now!
          </Typography>
          <Typography fontWeight="bold" variant="h5" fontSize={"25px"} fontFamily={'Trebuchet MS'}
            sx= {{...DisplayTextCSS}}>
            1. Select your question difficulties
          </Typography>
          <div className="container">
            <div>
              <input type="radio" id="buttonEasy" name="difficulty-radio" value={"Easy"} defaultChecked={selectedDifficulty === "Easy"}
                onChange={onChangeDifficulty}/>
              <label htmlFor="buttonEasy">Easy</label>
            </div>
            <div>
              <input type="radio" id="buttonMedium" name="difficulty-radio"  value={"Medium"} defaultChecked={selectedDifficulty === "Medium"}
                onChange={onChangeDifficulty}/>
              <label htmlFor="buttonMedium">Medium</label>
            </div>
            <div>
              <input type="radio" id="buttonHard" name="difficulty-radio" value={"Hard"} defaultChecked={selectedDifficulty === "Hard"}
                onChange={onChangeDifficulty}/>
              <label htmlFor="buttonHard">Hard</label>
            </div>
          </div>
          <Typography fontWeight="bold" variant="h5" fontSize={"25px"} fontFamily={'Trebuchet MS'}
            sx= {{...DisplayTextCSS}}>
            2. Select your preferred programming language
          </Typography>
          <div className="container">
            {(Object.keys(LANGUAGE) as (keyof typeof LANGUAGE)[]).map((key, index) => {
                return (
                  <div>
                    <input type="radio" id={key} name="lang-radio" value={LANGUAGE[key]} checked={selectedLanguage === LANGUAGE[key]}
                      onChange={onChangeLanguage}/>
                    <label htmlFor={key}>{key}</label>
                  </div>
                )
              })
            }
          </div>
            <div> 
              {theme.palette.mode === "dark" 
                ? <button className="matchDarkButton" onClick={() => { createMatch();  } }>Lets Match!</button> 
                : <button className="matchLightButton" onClick={() => { createMatch();  } }>Lets Match!</button>
              }
            </div>
          </div>
        }
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
