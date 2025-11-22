import React, { useState } from "react";
import axios from "axios";
import "../pages/AuthForm.css";

function AuthForm({ isLogin, onClose, onSwitch }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await axios.post(
          "http://localhost:3000/authentication/login",
          { email, password }
        );

        localStorage.setItem("token", response.data.accessToken);
        alert("Login successful!");
        onClose();
        return;
      }

      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/authentication/register",
        { email, password }
      );

      alert("Account created!");
      onSwitch();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
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
        <input
          type="email"
          placeholder="Email Address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        {!isLogin && (
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        )}
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
