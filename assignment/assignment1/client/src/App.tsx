import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuestionPage from "./scenes/questionPage/QuestionPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./state";

function App() {
  const mode: PaletteMode = useSelector((state: State) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/questions" />} />
            <Route path="/questions" element={<QuestionPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
