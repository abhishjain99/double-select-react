import React, { useState } from "react";
import "./ticTacToe.css";

const TicTacToe = () => {
  const [displayMessage, setDisplayMessage] = useState("Current Player: X");
  const [board, setBoard] = useState(new Array(9).fill(null));

  const handleReset = () => {
    console.log("handleReset");
  };

  const handleXO = (ind) => {
    console.log("handleXO", ind);
  };

  return (
    <div className="game">
      <div><h1>Tic Tac Toe</h1></div>
      <div className="displayMessage">{displayMessage}</div>
      <div>
        {board.every((cell) => cell !== null) ? (
          <button className="reset-button" onClick={handleReset}>Reset</button>
        ) : null}
      </div>
      <div className="board">
        {board.map((xo, ind) => (
          <div className="cell" key={ind} value={xo} onClick={() => handleXO(ind)}>{xo}</div>
        ))}
      </div>
    </div>
  );
};

export default TicTacToe;
