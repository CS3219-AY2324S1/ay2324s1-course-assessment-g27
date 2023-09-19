import React, { FormEvent, useState } from "react";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onSignUp: (username: string, password: string) => void;
  errorMessages: { login: string; signUp: string };
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSignUp, errorMessages }) => {
  const [loginError, setLoginError] = useState<string | string>("");
  const [signupError, setSignUpError] = useState<string | string>("");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("pass") as HTMLInputElement;
  
    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;
      
      // Assume onLogin returns a promise that resolves with an error message or null
      const result = await onLogin(uname, pass);
  
      if (result !== null) {
        setLoginError("Invalid username or password");
      } else {
        setLoginError("");
      }
    }
  };
  
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("pswd") as HTMLInputElement;
  
    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;
      
      // Assume onSignUp returns a promise that resolves with an error message or null
      const result = await onSignUp(uname, pass);
  
      if (result !== null) {
        setSignUpError("Username is already taken. Please choose another.");
      } else {
        setSignUpError("");
      }
    }
  };
  

  return (
    <div className="main">
      <div className="signup">
        <form onSubmit={handleSignUp}>
          <label htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="uname" placeholder="Username" required />
          <input type="password" name="pswd" placeholder="Password" required />
          <button className="signup-button">Sign up</button>
        </form>
        {signupError && <p className="error-message">{signupError}</p>}
      </div>

      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="text" name="uname" placeholder="Username" required />
          <input type="password" name="pass" placeholder="Password" required />
          <button className="login-button">Login</button>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
      {errorMessages.signUp && <p className="error-message">{errorMessages.signUp}</p>}
    </div>
  );
};

export default LoginPage;
