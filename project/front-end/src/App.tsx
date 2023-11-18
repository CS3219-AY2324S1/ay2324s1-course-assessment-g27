import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage/LoginPage";
import QuestionPage from "./scenes/questionPage/QuestionPage";
import ProfilePage from "./scenes/profilePage/ProfilePage";
import ChangePwdPage from "./scenes/changePwdPage/ChangePwdPage";
import HomePage from "./scenes/homePage/homePage";
import RoomPage from "./scenes/roomPage/roomPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./state";
import QnsHistPage from "./scenes/qnsHistPage/QnsHistPage";
import * as io from "socket.io-client";

export const matchSocket = io.connect("http://localhost:3001");
export const roomSocket = io.connect("http://localhost:3002");

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
            <Route
              path="/"
              element={isAuth ? <Navigate to="/homePage" /> : <LoginPage />}
            />
            <Route
              path="/homePage"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route path="/questions" element={<QuestionPage />} />
            <Route
              path="/roompage/:roomid"
              element={isAuth ? <RoomPage /> : <Navigate to="/" />}
            />
            <Route path="/profile/:activePage" element={<ProfilePage />} />
            <Route path="/password" element={<ChangePwdPage />} />
            <Route path="/history" element={<QnsHistPage />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
