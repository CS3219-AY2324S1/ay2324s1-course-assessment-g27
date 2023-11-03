import { PaletteMode } from "@mui/material";

// color design tokens export
export const colorTokens = {
  white: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#BBBCCA",
    100: "#ABADBC",
    200: "#9B9DAE",
    300: "#7C7E93",
    400: "#5C5F77",
    500: "#3D405B",
    600: "#313349",
    700: "#252637",
    800: "#181A24",
    900: "#12131B",
  },
  highlight: {
    purple: "#4E3FD8",
    darkblue: "#252D52",
    lightblue: "#BCD1FE"
  },
  red: {
    0: "#FCF2EF",
    1: "#F9E4DF",
    2: "#F3CABF",
    3: "#ECAF9F",
    4: "#E6957F",
    5: "#E07A5F",
    6: "#B7634D",
    7: "#8E4C3B",
    8: "#653528",
    9: "#3C1E16",
  },
  green: {
    0: "#F2F7F5",
    1: "#E6F0EB",
    2: "#CDE0D7",
    3: "#B3D1C2",
    4: "#9AC1AE",
    5: "#81B29A",
    6: "#68907C",
    7: "#4F6E5F",
    8: "#364B41",
    9: "#1D2924",
  },
  neonBlue: {
    0: "#00FFFF",
    1: "#2adbd4"
  }, 
  darkBlue: {
    0:"#001e2f",
    1:"#00101a"
  }
};

// mui theme settings
export const themeSettings = (mode: PaletteMode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            // primary: {
            //   dark: colorTokens.primary[200],
            //   main: colorTokens.primary[500],
            //   light: colorTokens.primary[800],
            // },
            primary: {
              darker: colorTokens.darkBlue[1],
              dark: colorTokens.primary[200],
              main: colorTokens.neonBlue[1],
              light: colorTokens.neonBlue[0],
            },
            
            neutral: {
              dark: colorTokens.white[100],
              main: colorTokens.white[200],
              mediumMain: colorTokens.white[300],
              medium: colorTokens.white[400],
              light: colorTokens.neonBlue[1],
            },
            background: {
              default: colorTokens.darkBlue[0],
              alt: colorTokens.darkBlue[0],
            },
            colors: {
              green: colorTokens.green[5],
              red: colorTokens.red[5],
            },
            highlight: {
              purple: "#5b4ddb",
              darkblue: "#252D52",
              lightblue: "#BCD1FE"
            },
          }
        : {
            // palette values for light mode
            primary: {
              darker: colorTokens.white[100],
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.white[700],
              main: colorTokens.white[500],
              mediumMain: colorTokens.white[400],
              medium: colorTokens.white[300],
              light: colorTokens.white[50],
            },
            background: {
              default: colorTokens.white[10],
              alt: colorTokens.white[0],
            },
            colors: {
              green: colorTokens.green[5],
              red: colorTokens.red[5],
            },
            highlight: {
              purple: "#4E3FD8",
              darkblue: "#252D52",
              lightblue: "#BCD1FE"
            },
          }),
    },
    typography: {
      fontFamily: ["Nunito Sans", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Nunito Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
