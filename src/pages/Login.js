import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/form_styles.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLogin((prevState) => !prevState);
    setUsername("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const endpoint = isLogin
      ? "https://usermgmtserv-microservice-852962313566.us-central1.run.app/api/auth/login"
      : "https://usermgmtserv-microservice-852962313566.us-central1.run.app/api/auth/register";

    const payload = { username, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong.");
      }

      const data = await response.json();
      alert(isLogin ? "Login successful!" : "Registration successful! Please login.");

      if (!isLogin) {
        setIsLogin(true); // Switch to login after registration
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="text-center mt-3">
        <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>{" "}
        <span className="toggle-link" onClick={handleToggle}>
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;

