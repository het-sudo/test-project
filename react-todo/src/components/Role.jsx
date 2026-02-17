import React, { useState } from "react";

function Role() {
  
  const [role,setrole]=useState("guest");


  return (
    <>
  <select value={role} onChange={(e)=>setrole(e.target.value)}>
    <option value="admin">Admin</option>
    <option value="user">User</option>
    <option value="guest">Guest</option>

  </select>
  {
    role==='admin' && ( <h1>admin dashboard </h1>)
  }
  {
    role==='user' && ( <h1>user dashboard </h1>)
  }
  {
    role==='guest' && ( <h1>guest dashboard </h1>)
  }

    </>
  );
}

export default Role;
