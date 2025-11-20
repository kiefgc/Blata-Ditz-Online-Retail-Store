import React, { useState } from "react";
import "./AuthForm.css";

function AuthForm({ isLogin, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging in as: ", email);
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }
    console.log("Signing up with:", email);
  };

  return (
    <div className="pop-up-form" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>
        &times;
      </button>

      <h2>{isLogin ? "Log in to your account" : "Create an account"}</h2>

      <p className="form-subheading">
        {isLogin
          ? "Enter your email address and password"
          : "Enter an email address and password"}
      </p>

      <form onSubmit={submit}>
        <input type="email" required placeholder="Email Address"></input>
        <input type="password" required placeholder="Password"></input>
        {!isLogin && (
          <input
            type="password"
            required
            placeholder="Confirm Password"
          ></input>
        )}

        <button type="submit" className="submit-button">
          {isLogin ? "Log In" : "Sign Up"}
        </button>
      </form>

      <p className="switch-text">
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button type="button" className="switch-link" onClick={onSwitch}>
          {isLogin ? "Create an account" : "Sign in here"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
