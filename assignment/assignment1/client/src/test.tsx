import React, { useState, FormEvent } from "react";
import ReactDOM from "react-dom";
import QuestionPage from "./QuestionPage";

import "./App.css";

interface User {
  username: string;
  password: string;
}

interface ErrorMessage {
  name: string;
  message: string;
}

interface Question {
  id: number;
  title: string;
  description: string;
  complexity: string;
  category: string;
}

function App() {
  const [errorMessages, setErrorMessages] = useState<ErrorMessage>({ name: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [isSignupSubmitted, setIsSignupSubmitted] = useState(false);
  const [signupErrorMessages, setSignupErrorMessages] = useState<ErrorMessage>({ name: "", message: "" });

  const questions: Question[] = [
    {
      id: 1,
      title: 'Reverse a String',
      description: 'Description for question 1',
      complexity: 'Easy',
      category: 'Strings, Algorithms'
    },
    {
      id: 2,
      title: 'Linked List Cycle Detection',
      description: 'Description for question 2',
      complexity: 'Easy',
      category: 'Data Structures, Algorithms'
    },
    {
      id: 3,
      title: 'Roman to Integer',
      description: 'Description for question 3',
      complexity: 'Easy',
      category: 'Algorithms'
    },
    {
      id: 4,
      title: 'Add Binary',
      description: 'Description for question 4',
      complexity: 'Easy',
      category: 'Bit Manipulation, Algorithms'
    },
    // Add more questions here...
  ];

  // User Login info
  const database: User[] = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors: Record<string, string> = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("pass") as HTMLInputElement;

    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;

      const userData = database.find((user) => user.username === uname);

      if (userData) {
        if (userData.password !== pass) {
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsLoggedIn(true);
          setCurrentUsername(uname);
        }
      } else {
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    }
  };

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("signup-uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("signup-pass") as HTMLInputElement;

    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;

      const isUsernameTaken = database.some((user) => user.username === uname);

      if (isUsernameTaken) {
        setSignupErrorMessages({ name: "signup-uname", message: "Username is already taken." });
      } else {
        const newUser: User = {
          username: uname,
          password: pass,
        };
        database.push(newUser);

        setIsLoggedIn(true);
        setCurrentUsername(uname);
        setIsSignupSubmitted(true);
      }
    }
  };

  const renderErrorMessage = (name: string, message: string) =>
    name === errorMessages.name && <div className="error">{message}</div>;

  const renderSignupError = (name: string, message: string) =>
    name === signupErrorMessages.name && <div className="error">{message}</div>;

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname", errorMessages.message)}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass", errorMessages.message)}
        </div>
        <div className="button-container">
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  );

  const renderSignupForm = (
    <div className="form">
      <form onSubmit={handleSignupSubmit}>
        <div className="input-container">
          <label>Username</label>
          <input type="text" name="signup-uname" required />
          {renderSignupError("signup-uname", signupErrorMessages.message)}
        </div>
        <div className="input-container">
          <label>Password</label>
          <input type="password" name="signup-pass" required />
        </div>
        <div className="button-container">
          <input type="submit" value="Sign Up" />
        </div>
      </form>
    </div>
  );

  const renderQuestionPage = (
    <div className="question-page">
      {currentUsername && <h1>Welcome, {currentUsername}!</h1>}
      <QuestionPage questions={questions} />
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isLoggedIn ? (
          renderQuestionPage
        ) : isSignupSubmitted ? (
          <div>User is successfully signed up and logged in</div>
        ) : isSignUpMode ? (
          renderSignupForm
        ) : (
          renderForm
        )}
        <div className="toggle-signup">
          {!isSignUpMode ? (
            <p onClick={() => setIsSignUpMode(true)}>Sign up instead</p>
          ) : (
            <p onClick={() => setIsSignUpMode(false)}>Back to login</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
