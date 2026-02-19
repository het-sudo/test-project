import React, { useState } from 'react';

export default function ColorMixer() {
  const [r, setR] = useState(128);
  const [g, setG] = useState(128);
  const [b, setB] = useState(128);

  const style = { backgroundColor: `rgb(${r}, ${g}, ${b})` };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="w-full h-32 border rounded mb-4" style={style}></div>
      
      {[
        { label: "Red", value: r, setter: setR, color: "bg-red-500" },
        { label: "Green", value: g, setter: setG, color: "bg-green-500" },
        { label: "Blue", value: b, setter: b, color: "bg-blue-500" }
      ].map(({ label, value, setter, color }) => (
        <div key={label} className="mb-2">
          <label>{label}: {value}</label>
          <input
            type="range"
            min="0"
            max="255"
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className={`w-full h-2 ${color} rounded`}
          />
        </div>
      ))}
      
      <p className="font-mono mt-2">rgb({r}, {g}, {b})</p>
    </div>
  );
}   