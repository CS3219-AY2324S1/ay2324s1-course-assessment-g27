
import { Box, useMediaQuery, Typography } from "@mui/material";
import Navbar from "../navBar";
import "./homePage.css";
import { useNavigate } from "react-router-dom";




const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const navigate = useNavigate();
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
        <button className="button-easy" onClick={() => navigate("/roomPage")}>Easy </button>
        <button className="button-medium" onClick={() => navigate("/roomPage")} >Medium </button>
        <button className="button-hard" onClick={() => navigate("/roomPage")}>Hard</button>
        </div>
          {isNonMobileScreens && <Box flexBasis="26%"></Box>}
        </Box>
      </Box>
    );
  };

export default HomePage
