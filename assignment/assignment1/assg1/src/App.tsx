import React, { useState, FormEvent } from "react";
import ReactDOM from "react-dom";
import QuestionPage from "./QuestionPage";

import "./App.css"

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
  // React States
  const [errorMessages, setErrorMessages] = useState<ErrorMessage>({ name: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user login state

  // Sample questions
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
    pass: "invalid password"
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("pass") as HTMLInputElement;
  
    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;
  
      // Find user login info
      const userData = database.find((user) => user.username === uname);
  
      // Compare user info
      if (userData) {
        if (userData.password !== pass) {
          // Invalid password
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          setIsLoggedIn(true); // Set user as logged in
        }
      } else {
        // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    }
  };
  

  // Generate JSX code for error message
  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  // JSX code for the question page
  const renderQuestionPage = (
    <div className="question-page">
      {/* Replace this with your question content */}
      <h1>LeetCode Question</h1>
      <p>This is the question description.</p>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        {isLoggedIn ? (
          <QuestionPage questions={questions} />
        ) : isSubmitted ? (
          <div>User is successfully logged in</div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default App;
