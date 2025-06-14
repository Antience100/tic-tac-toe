/*jshint esversion: 6 */

const player = (function () {
  return function (name, token) {
    return {
      name,
      token,
      moves: [],
      addMove: function (move) {
        this.moves.push(move);
      },
      clearMoves: function () {
        this.moves = [];
      },
    };
  };
})();

const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2], // Row
      [3, 4, 5], // Row
      [6, 7, 8], // Row
      [0, 3, 6], // Column
      [1, 4, 7], // Column
      [2, 5, 8], // Column
      [0, 4, 8], // Diagonal
      [2, 4, 6], // Diagonal
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winner, "X" or "O"
      }
    }

    if (!board.includes("")) {
      return "Draw"; // Return "Draw" if the board is full and there is no winner
    }

    return null; // Return null if there is no winner yet
  }

  return {
    getGameBoard: () => board,
    setBoardCell: (index, value) => {
      if (board[index] === "" && (value === "X" || value === "O")) {
        board[index] = value;
        return true;
      }
      return false;
    },
    clearGameBoard: () => board.fill(""),
    checkGameBoard: () => board.every((cell) => cell !== ""),
    checkWinner,
  };
})();

const game = (function () {})();
