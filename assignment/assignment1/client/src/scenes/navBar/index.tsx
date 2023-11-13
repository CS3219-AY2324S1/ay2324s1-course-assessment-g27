import { useState } from "react";
import {
  Box,
  IconButton,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Theme } from "@mui/system";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme: Theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;

  return (
    <FlexBetween padding="1rem 6%">
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
          PeerPrep
        </Typography>

        <Button
          sx={{ color: theme.palette.mode === dark ? neutralLight : dark }}
          onClick={() => navigate("/questions")}
        >
          QuestionPage
        </Button>
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode
                sx={{
                  borderRadius: "15px",
                  border: "0",
                  color: primaryLight,
                  fontSize: "25px",
                  "&:hover": { boxShadow: "0 0px 20px" + primaryLight },
                }}
              />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
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
                <DarkMode sx={{ color: neutralLight, fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;
