const gameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];

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
  };
})();

// console.log(gameBoard.getGameBoard());
// gameBoard.setBoardCell(5, "X");
// console.log(gameBoard.getGameBoard());
// gameBoard.clearGameBoard();
// gameBoard.setBoardCell(0, "X");
// gameBoard.setBoardCell(1, "X");
// gameBoard.setBoardCell(2, "X");
// gameBoard.setBoardCell(3, "X");
// gameBoard.setBoardCell(4, "X");
// gameBoard.setBoardCell(5, "X");
// gameBoard.setBoardCell(6, "X");
// gameBoard.setBoardCell(7, "X");
// gameBoard.setBoardCell(8, "X");
// console.log(gameBoard.getGameBoard());
// console.log(gameBoard.checkGameBoard());
