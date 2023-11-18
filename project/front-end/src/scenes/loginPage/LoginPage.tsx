import { Box, Typography, useTheme } from "@mui/material";
import { Theme } from "@mui/system";
import Form from "./Form";
import TopBar from "../../components/TopBar";
import loginPageImage from "../../assets/loginPage.png";
import darkLoginPageImage from "../../assets/loginPageDark.png";
import "./LoginPage.css";

const LoginPage = () => {
  const theme: Theme = useTheme();
  return (
    <Box className="container">
      <Box className="left">
        <TopBar />
        <Box
          sx={{
            pt: "5%",
            pl: "5%",
            pr: "5%",
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <>
            <Typography
              fontWeight="900"
              variant="h2"
              // color="primary"
              component="span"
            >
              Welcome to{" "}
            </Typography>
            <Typography
              fontWeight="900"
              variant="h2"
              color={theme.palette.highlight.purple}
              component="span"
            >
              PeerPrep
            </Typography>
            <Typography
              fontWeight="900"
              variant="h2"
              // color="primary"
              component="span"
            >
              , <br /> a platform for{" "}
            </Typography>
            <Typography
              fontWeight="900"
              variant="h2"
              color={theme.palette.highlight.purple}
              component="span"
            >
              collaborative tech interview prep
            </Typography>
            <Typography
              fontWeight="900"
              variant="h2"
              // color="primary"
              component="span"
            >
              !
            </Typography>
          </>
          <Form />
        </Box>
      </Box>
      <Box className="right" sx={{backgroundColor:"black"}}>
        <img src={theme.palette.mode === "dark" ?
        darkLoginPageImage : loginPageImage} />
      </Box>
    </Box>
  );
};

export default LoginPage;
