import React from "react";

function Login({ setUser }) {
  const handleLogin = (role) => {
  
    setUser({ name: "John", role });
  };

  return (
    <div>
      <h2>Select Role to Login</h2>
      <button onClick={() => handleLogin("admin")}>Login as Admin</button>
      <button onClick={() => handleLogin("user")}>Login as User</button>
    </div>
  );
}

export default Login;
