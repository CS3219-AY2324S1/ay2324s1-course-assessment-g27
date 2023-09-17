import React, { FormEvent } from "react";
import "./LoginPage.css";

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  errorMessages: { name: string; message: string };
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, errorMessages }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const unameInput = form.elements.namedItem("uname") as HTMLInputElement;
    const passInput = form.elements.namedItem("pass") as HTMLInputElement;

    if (unameInput && passInput) {
      const uname = unameInput.value;
      const pass = passInput.value;
      onLogin(uname, pass);
    }
  };

  return (
    <div className="main">
      <div className="signup">
        <form>
          <label htmlFor="chk" aria-hidden="true">
            Sign up
          </label>
          <input type="text" name="uname" placeholder="Username" required />
          <input type="password" name="pswd" placeholder="Password" required />
          <button>Sign up</button>
        </form>
      </div>

      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="login">
        <form onSubmit={handleSubmit}>
          <label htmlFor="chk" aria-hidden="true">
            Login
          </label>
          <input type="text" name="uname" placeholder="Username" required />
          <input type="password" name="pass" placeholder="Password" required />
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
