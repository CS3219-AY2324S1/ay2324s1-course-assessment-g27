import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage/LoginPage";
import QuestionPage from "./scenes/questionPage/QuestionPage";
import ProfilePage from "./scenes/profilePage/ProfilePage";
import ChangePwdPage from "./scenes/changePwdPage/ChangePwdPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./state";

function App() {
  const mode: PaletteMode = useSelector((state: State) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state: State) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
          <Route path="/" element={isAuth ? <Navigate to="/questions" /> : <LoginPage />} />
            <Route path="/questions" element={isAuth ? <QuestionPage/> : <Navigate to="/"/>} />
            <Route
              path="/profile/:activePage"
              element={<ProfilePage />}
            />
            <Route
              path="/password"
              element={<ChangePwdPage />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
