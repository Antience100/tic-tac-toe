const player = (function () {
  let playerCounter = 0;

  return function (name, token) {
    playerCounter++;
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

let jones = player("Jones", "X");
let dirk = player("Dirk", "O");

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
