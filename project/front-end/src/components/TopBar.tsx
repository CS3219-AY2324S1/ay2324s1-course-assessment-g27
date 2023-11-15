import { Box, Typography, useTheme } from "@mui/material";
import { Theme } from "@mui/system";

const TopBar = () => {
  const theme: Theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: "90px",
        pt: "20px",
        pl: "3%",
        background: theme.palette.highlight.purple,
      }}
    >
      <Typography
        fontWeight="bold"
        fontSize="40px"
      >
        PeerPrep
      </Typography>
    </Box>
  );
};

export default TopBar;
