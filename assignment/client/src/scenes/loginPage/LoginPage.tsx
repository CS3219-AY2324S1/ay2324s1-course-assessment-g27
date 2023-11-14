// import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
// import { Theme } from "@mui/system";
// import Form from "./Form";

// const LoginPage = () => {
//   const theme: Theme = useTheme();
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
//   return (
//     <Box>
//       <Box
//         sx={{
//           width: "50%",
//           backgroundColor: theme.palette.background.alt,
//           padding: "1rem 6%",
//           textAlign: "left",
//         }}
//       >
//         <Typography fontWeight="bold" fontSize="40px" color="primary">
//           PeerPrep
//         </Typography>
//       </Box>

//       <Box
//         sx={{
//           width: isNonMobileScreens ? "50%" : "25%",
//           backgroundColor: theme.palette.background.alt,
//           padding: "2rem",
//           m: "2rem auto",
//           borderRadius: "1.5rem",
//         }}
//       >
//         <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
//           Welcome to PeerPrep, a platform for collaborative tech interview prep!
//         </Typography>
//         <Form />
//       </Box>
//     </Box>
//   );
// };

// export default LoginPage;
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
