import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // assuming you have a service function to handle login

import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // Use email for login
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(email, password); // Send email and password
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      alert("Login successful!");
      data.role === "admin" ? navigate("/admin") : navigate("/user"); // Navigate based on role
    } catch (err) {
      console.error(err);
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email" // Specify email input
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Login</button>
          <p className="register-link">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
