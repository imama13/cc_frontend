import React from "react";
import { useNavigate } from 'react-router-dom'; // If you're using React Router
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handlelogout = async() => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };
  const username = user.username;
  return (
    <header className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          Video Streaming App
        </a>
        {/* Display the username */}
        <span className="navbar-text text-white ml-auto">
          Welcome, {username}
        </span>
        <button className="btn btn-danger" onClick={handlelogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
