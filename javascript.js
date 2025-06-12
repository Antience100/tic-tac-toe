const player = (name, token) => {
  return {
    getPlayerName: () => name,
    getPlayerToken: () => token,
  };
};

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

let player1 = player("Jones", "X");
console.log(player1.getPlayerName(), player1.getPlayerToken());
