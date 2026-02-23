import React from "react";
import { Navigate } from "react-router-dom";

const Protectedroute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Not logged in, redirect to login
    return <Navigate to="/login" replace />;
  }

  // Logged in, render the children
  return children;
};

export default Protectedroute;