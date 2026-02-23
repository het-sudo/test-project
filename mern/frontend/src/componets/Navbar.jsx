import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-neutral-500 flex gap-x-8 p-4">
      <Link to="/">Notes</Link> <Link to="/about">About</Link>
      {!token ? (
        <>
          {"  "}<Link to="/login">Login</Link>
          {"  "}<Link to="/register">Register</Link>
        </>
      ) : (
        <>
          {"  "}<button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navbar;