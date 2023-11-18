import { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  InputBase,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout, State } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Theme } from "@mui/system";
import {roomSocket} from "../../App";

type NavbarProps = {
  inRoomStatus: boolean;
};

const Navbar: React.FC<NavbarProps> = ({inRoomStatus}) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: State) => state.user);
  const [inRoom] = useState(inRoomStatus);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme: Theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const username = user.username;

  const handleLogOut = () => {
    roomSocket.emit("roommate_navigate");
    navigate(`/`);
    dispatch(setLogout());
  }
  //const handleClickUsername = (event: )

  if(!inRoom) {
    return (
      <FlexBetween padding="1rem 6%">
        <FlexBetween gap="1.75rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            onClick={() => {navigate("/homePage")}}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
                textShadow: "0 0 0.05em #fff, 0 0 0.1em #fff, 0 0 0.2em " +
                primaryLight + ", 0 0 0.3em " + primaryLight+ ", 0 0 0.5em" +
                  primaryLight 
              },
            }}
          >
            PeerPrep
          </Typography>
          <Button 
            sx ={{color: theme.palette.mode === dark ? neutralLight : dark}}
            onClick={() => {navigate("/homePage");}}>Home</Button>
          <Button 
            sx ={{color: theme.palette.mode === dark ? neutralLight : dark}}
            onClick={() => {navigate("/questions");}}>Questions</Button>
          <Button 
            sx ={{color: theme.palette.mode === dark ? neutralLight : dark}}
            onClick={() => {navigate("/history");}}>Learning Progress</Button>
        </FlexBetween>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ borderRadius:"15px", border:"0", color:primaryLight, fontSize: "25px", 
                "&:hover":{boxShadow: "0 0px 20px" + primaryLight }}} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <FormControl variant="standard">
              <InputLabel id="Options">Age</InputLabel>
              
              <Select
                labelId="Options"
                value={username}
                sx={{
                  backgroundColor: neutralLight,
                  color: "black",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={username} onClick={() => { navigate(`/profile/info`);}}>
                <Typography>{username}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            sx={{
              position: "fixed",
              right: "0",
              bottom: "0",
              height: "100%",
              zIndex: "10",
              maxWidth: "500px",
              minWidth: "300px",
              backgroundColor: background,
            }}
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "25px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkMode sx={{ color:neutralLight, fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>
              <FormControl variant="standard">
                <Select
                  value={username}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={username} onClick={() => {navigate(`/profile/info`);}}>
                    <Typography>{username}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogOut}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    ); } 
    else { //NavBar inside a roomPage
    return (<FlexBetween padding="1rem 6%">
    <FlexBetween gap="1.75rem">
    </FlexBetween>

    {/* DESKTOP NAV */}
    {isNonMobileScreens ? (
      <FlexBetween gap="2rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ borderRadius:"15px", border:"0", color:primaryLight, fontSize: "25px", 
            "&:hover":{boxShadow: "0 0px 20px" + primaryLight }}} />
          ) : (
            <LightMode sx={{ color: dark, fontSize: "25px" }} />
          )}
        </IconButton>
        <FormControl variant="standard">
          <InputLabel id="Options">Age</InputLabel>
          
          <Select 
            labelId="Options"
            value={username}
            renderValue={(value) => (
              <Typography>{value}</Typography>
            )}
            sx={{
              backgroundColor: neutralLight,
              color: "black",
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root": {
                pr: "0.25rem",
                width: "3rem",
              },
              "& .MuiSelect-select:focus": {
                backgroundColor: neutralLight,
              },
            }}
            input={<InputBase />}
          >
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
    ) : (
      <IconButton
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        <Menu />
      </IconButton>
    )}

    {/* MOBILE NAV */}
    {!isNonMobileScreens && isMobileMenuToggled && (
      <Box
        sx={{
          position: "fixed",
          right: "0",
          bottom: "0",
          height: "100%",
          zIndex: "10",
          maxWidth: "500px",
          minWidth: "300px",
          backgroundColor: background,
        }}
      >
        {/* CLOSE ICON */}
        <Box display="flex" justifyContent="flex-end" p="1rem">
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Close />
          </IconButton>
        </Box>

        {/* MENU ITEMS */}
        <FlexBetween
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap="3rem"
        >
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{ fontSize: "25px" }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ color:neutralLight, fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <FormControl variant="standard">
            <Select
              value={username}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem onClick={handleLogOut}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      </Box>
    )}
  </FlexBetween>);
  }
};

export default Navbar;
