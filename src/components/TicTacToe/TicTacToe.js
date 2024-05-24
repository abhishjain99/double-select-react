import React, { useState } from "react";
import "./ticTacToe.css";

const TicTacToe = () => {
  const [board, setBoard] = useState(new Array(9).fill(null));
  return (
    <div className="game">
      <div><h1>Tic Tac Toe</h1></div>
    </div>
  )
};

export default TicTacToe;
