import { useState } from "react";
import "../App.css";

const faces = [1, 2, 3, 4, 5, 6];

function Diceroller() {
  const [current, setCurrent] = useState(0);

  const rollDice = () => {
    const randomIndex = Math.floor(Math.random() * faces.length);
    setCurrent(randomIndex);
  };

  return (
    <div className="app-container">
      <h1>Dice Roller 🎲</h1>

      {/* Dice window */}
      <div className="dice-window">
        <div
          className="dice-strip"
          style={{ transform: `translateY(-${current * 60}px)` }}
        >
          {faces.map((face) => (
            <div className="dice-face" key={face}>
              {face}
            </div>
          ))}
        </div>
      </div>
  
      {/* Roll button */}
      <button className="roll-button" onClick={rollDice}>
        Roll Dice
      </button>
    </div>
  );
}

export default Diceroller;