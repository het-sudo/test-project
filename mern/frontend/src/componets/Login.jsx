import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ email, password });
      alert("Login successful!");
      navigate("/"); // go to home
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <>
        <h2 className="font-bold text-center text-7xl">Login</h2>
   
        <form onSubmit={handleSubmit}>
    <div className="flex flex-col p-4 pb-9 max-w-sm mx-auto">
  
      <input className="w-full px-3 py-2 border mb-4 border-gray-300 rounded-md shadow-sm" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input className="w-full px-3 py-2 border mb-4 border-gray-300 rounded-md shadow-sm"   type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  bg-indigo-700 hover:bg-indigo-300 " type="submit">Login</button>
    </div>
    </form>
  </>
 
  );
};

export default Login;