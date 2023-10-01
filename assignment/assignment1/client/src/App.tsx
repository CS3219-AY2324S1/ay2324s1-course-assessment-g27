// import React, { useState } from "react";
// import LoginPage from "./scenes/loginPage/LoginPage";
// import QuestionPage from "./scenes/questionPage/QuestionPage";
// import "./App.css";

// interface User {
//   username: string;
//   password: string;
// }

// interface Question {
//   index: string;
//   title: string;
//   description: string;
//   difficulty: string;
//   tags: Array<string>;
//   examples: Array<string>;
//   constraints: Array<string>;
// }

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [currentUsername, setCurrentUsername] = useState<string | null>(null);
//   const [loginError, setLoginError] = useState<string | string>("");
//   const [signUpError, setSignUpError] = useState<string | string>("");

//   // Sample questions data
//   const questions: Question[] = [
//     {
//       index: "1",
//       title: "Reverse a String",
//       description: "Write a function to reverse a given string.",
//       difficulty: "Easy",
//       tags: ["Strings", " Algorithms"],
//       examples: ["Input: 'hello', Output: 'olleh'"],
//       constraints: ["Do not use built-in reverse methods."],
//     },
//     {
//       index: "2",
//       title: "Linked List Cycle Detection",
//       description: "Detect if a linked list contains a cycle.",
//       difficulty: "Medium",
//       tags: ["Data Structures", "Algorithms"],
//       examples: ["Input: [1 -> 2 -> 3 -> 4 -> 2], Output: true"],
//       constraints: ["You must use constant space."],
//     },
//     {
//       index: "3",
//       title: "Roman to Integer",
//       description: "Convert a Roman numeral to an integer.",
//       difficulty: "Easy",
//       tags: ["Algorithms"],
//       examples: ["Input: 'III', Output: 3"],
//       constraints: ["Roman numerals are given in the range of 1 to 3999."],
//     },
//     // Add more questions here...
//   ];

//   // Sample user data
//   const database: User[] = [
//     {
//       username: "user1",
//       password: "pass1",
//     },
//     {
//       username: "user2",
//       password: "pass2",
//     },
//     // Add more users here...
//   ];

//   const handleLogin = (username: string, password: string) => {
//     const userData = database.find((user) => user.username === username);

//     if (userData && userData.password === password) {
//       setIsLoggedIn(true);
//       setCurrentUsername(username);
//       setLoginError(""); // Reset login error
//     } else {
//       setLoginError("Invalid username or password"); // Set login error
//     }
//   };

//   const handleSignUp = (username: string, password: string) => {
//     // Check if the username is already taken
//     if (database.some((user) => user.username === username)) {
//       setSignUpError("Username is already taken. Please choose another.");
//     } else {
//       // Add the new user to the list
//       database.push({ username, password });
//       setIsLoggedIn(true);
//       setCurrentUsername(username);
//       setSignUpError(""); // Reset signup error
//     }
//   };

//   return (
//     <div className="app">
//       <div className="login-form">
//         {isLoggedIn ? (
//           <div className="question-page">
//             {currentUsername && <h1>Welcome, {currentUsername}!</h1>}
//             <QuestionPage questions={questions} />
//           </div>
//         ) : (
//           <div>
//             <LoginPage
//               onLogin={handleLogin}
//               onSignUp={handleSignUp}
//               errorMessages={{ login: loginError, signUp: signUpError }}
//             />
//             {loginError && <p className="error-message">{loginError}</p>}
//             {signUpError && <p className="error-message">{signUpError}</p>}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./scenes/loginPage/LoginPage";
import QuestionPage from "./scenes/questionPage/QuestionPage";
import HomePage from "./scenes/homePage/homePage";
import RoomPage from "./scenes/roomPage/roomPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, PaletteMode, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { State } from "./state";
import { Home } from "@mui/icons-material";


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
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/homePage"
              element={isAuth ? <HomePage/> : <Navigate to="/" />}
            />
            <Route path="/questions" element={<QuestionPage/>} />
            <Route path="/roompage" element={<RoomPage/>}/>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
