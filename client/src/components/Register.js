import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { registerUser } from "../services/api"; // Import the register function
import "../styles/Register.css"; // Import the CSS for styling

const Register = () => {
  const [email, setEmail] = useState(""); // Added state for email
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call register API with email, username, password, and role
      await registerUser(email, username, password, role);
      alert("Registration successful! Please login.");

      // Redirect to login page after successful registration
      navigate("/login"); // Redirect to login page
    } catch (err) {
      console.error(err);
      alert("Error during registration.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email" // Use email type for proper validation
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="textbox">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <div className="textbox">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn">Register</button>
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
