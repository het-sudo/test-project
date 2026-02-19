import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

let timeoutId;
function debounce(func, delay) {
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

function Searchcomponent() {
  const [value, setValue] = useState("");

  const handleChange = (inputValue) => {
    console.log("Debounced input:", inputValue);
  };

  const debouncedChange = debounce(handleChange, 400);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <input
        className="flex justify-center border border-black-500"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          debouncedChange(e.target.value);
        }}
        placeholder="Type to search..."
      />
      <nav>
        <Link to="/email">Email</Link>
        <Link to="/search/todo">TOdo</Link>
      </nav>
    </>
  );
}

export default Searchcomponent;
