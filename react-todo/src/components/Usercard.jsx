import React from "react";
import "../App.css";
function Usercard({ name, age, email, aavtar }) {
  return (
    <div className="user-container">
      <p>Name - {name} </p>

      <br />

      <p> Age - {age}</p>

      <br />

      <p> email - {email}</p>

      <br />

      <p>
        {" "}
        <img src={aavtar} alt="" />
      </p>
    </div>
  );
}

export default Usercard;
