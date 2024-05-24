import React, { useState, useMemo, useCallback } from "react";
import "./ticTacToe.css";

const getWinner = (board) => {
  const winnerIn = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let [f, s, t] of winnerIn) {
    if (board[f] === board[s] && board[s] === board[t] && board[f] !== null) return board[f];
  }
  return null;
};

const TicTacToe = () => {
  const [displayMessage, setDisplayMessage] = useState("Current Player: X");
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [x, setX] = useState(true);
  const winner = useMemo(() => getWinner(board), [board]);

  const handleReset = () => {
    setBoard(new Array(9).fill(null));
    setX(true);
    setDisplayMessage("Current Player: X");
  };

  const handleXO = useCallback(
    (ind) => {
      if (winner || board[ind]) return;
      let boardRef = [...board];
      boardRef[ind] = x ? "X" : "O";
      setBoard(boardRef);
      setX(!x);
    },
    [board, x, winner]
  );

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
