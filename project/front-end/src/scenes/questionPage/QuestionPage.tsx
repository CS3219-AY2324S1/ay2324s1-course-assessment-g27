import { Box, useMediaQuery } from "@mui/material";
import Navbar from "../navBar";
import MyQuestionWidget from "../widgets/MyQuestionWidget";
const QuestionPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  return (
    <Box>
      <Navbar inRoomStatus={false}/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box sx={{width:"100%", padding:"0"}}
          flexBasis={isNonMobileScreens ? "69%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyQuestionWidget/>
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default QuestionPage;
