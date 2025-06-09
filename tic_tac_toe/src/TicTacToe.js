import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * Main container component for the TicTacToe Classic game.
 * Renders a 3x3 grid, displays player turn, status, and provides game logic.
 */
function TicTacToe() {
  // Set up the game board as a 9-element array (3x3)
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' goes first by default
  const [xIsNext, setXIsNext] = useState(true);
  // Cached winner
  const winner = calculateWinner(board);
  // Is draw if no winner and board is full
  const isDraw = !winner && board.every(Boolean);

  // Handler for clicking a square
  function handleSquareClick(idx) {
    if (board[idx] || winner) return; // ignore if occupied or ended
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? "X" : "O";
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // Handler for reset
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }

  // Render single square
  function renderSquare(idx) {
    return (
      <button
        className="ttt-square"
        aria-label={`Square ${idx + 1}`}
        key={idx}
        onClick={() => handleSquareClick(idx)}
        disabled={Boolean(board[idx]) || Boolean(winner)}
      >
        {board[idx]}
      </button>
    );
  }

  // Status message
  let status;
  if (winner) {
    status = (
      <span className="ttt-status-winner">
        Winner: <span>{winner}</span>
      </span>
    );
  } else if (isDraw) {
    status = <span className="ttt-status-draw">Draw!</span>;
  } else {
    status = (
      <span className="ttt-status-next">
        Turn: <span>{xIsNext ? "X" : "O"}</span>
      </span>
    );
  }

  return (
    <div className="ttt-container">
      <h2 className="ttt-title">Tic Tac Toe</h2>
      <div className="ttt-turn">{!winner && !isDraw ? `Current Player: ${xIsNext ? "X" : "O"}` : null}</div>
      <div className="ttt-board">
        {[0, 1, 2].map((row) => (
          <div className="ttt-row" key={row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </div>
        ))}
      </div>
      <div className="ttt-status">{status}</div>
      <button className="ttt-reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Check for a winner on the board.
 * @param {Array<string|null>} squares
 * @returns {'X'|'O'|null}
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
