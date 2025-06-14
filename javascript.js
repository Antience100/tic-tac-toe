/*jshint esversion: 6 */

const player = (function () {
  return function (name, token) {
    return {
      name,
      token,
      addMove: function (index) {
        return gameBoard.setBoardCell(index, this.token);
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
    setBoardCell: (index, value) => {
      if (
        index < 0 ||
        index > 8 ||
        board[index] !== "" ||
        (value !== "X" && value !== "O")
      ) {
        return false;
      }
      board[index] = value;
      return true;
    },
    clearGameBoard: () => board.fill(""),
    getGameBoard: () => [...board],
    checkWinner,
  };
})();

const game = (function () {
  let player1, player2, currentPlayer;
  let isGameActive = false;

  function startGame() {
    gameBoard.clearGameBoard();
    player1 = player("Player 1", "X");
    player2 = player("Player 2", "O");
    currentPlayer = player1;
    isGameActive = true;

    return {
      board: gameBoard.getGameBoard(),
      currentPlayer: currentPlayer.token,
      status: "Game started",
    };
  }

  function handleMove(index) {
    if (!isGameActive || index < 0 || index > 8) {
      return {
        board: gameBoard.getGameBoard(),
        currentPlayer: currentPlayer.token,
        status: "Invalid move",
        isGameActive,
      };
    }
    const moveSuccessful = currentPlayer.addMove(index);

    if (moveSuccessful) {
      const winner = gameBoard.checkWinner();
      if (winner) {
        isGameActive = false;
        /*jshint esversion: 6 */

        const player = (function () {
          return function (name, token) {
            return {
              name,
              token,
              addMove: function (index) {
                gameBoard.setBoardCell(index, this.token);
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
            setBoardCell: (index, value) => {
              if (
                index < 0 ||
                index > 8 ||
                board[index] !== "X" ||
                (value !== "X" && value !== "O")
              ) {
                return false;
              }
              board[index] = value;
              return true;
            },
            clearGameBoard: () => board.fill(""),
            getGameBoard: () => [...board],
            checkWinner,
          };
        })();

        const game = (function () {
          let player1, player2, currentPlayer;
          let isGameActive = false;

          function startGame() {
            gameBoard.clearGameBoard();
            player1 = player("Player 1", "X");
            player2 = player("Player 2", "O");
            currentPlayer = player1;
            isGameActive = true;

            return {
              board: gameBoard.getGameBoard(),
              currentPlayer: currentPlayer.token,
              status: "Game started",
            };
          }

          function handleMove(index) {
            if (!isGameActive || index < 0 || index > 8) {
              return {
                board: gameBoard.getGameBoard(),
                currentPlayer: currentPlayer.token,
                status: "Invalid move",
                isGameActive,
              };
            }
            const moveSuccessful = currentPlayer.addMove(index);

            if (moveSuccessful) {
              const winner = gameBoard.checkWinner();
              if (winner) {
                isGameActive = false;
                return {
                  board: gameBoard.getGameBoard(),
                  currentPlayer: currentPlayer.token,
                  status:
                    winner === "Draw" ? "Draw" : `${currentPlayer.name} wins!`,
                  isGameActive,
                };
              }
              currentPlayer = currentPlayer === player1 ? player2 : player1;
              return {
                board: gameBoard.getGameBoard(),
                currentPlayer: currentPlayer.token,
                status: `${currentPlayer.name}'s turn`,
                isGameActive,
              };
            }

            return {
              board: gameBoard.getGameBoard(),
              currentPlayer: currentPlayer.token,
              status: "Invalid move",
              isGameActive,
            };
          }

          function getGameState() {
            return {
              board: gameBoard.getGameBoard(),
              currentPlayer: currentPlayer ? currentPlayer.token : null,
              status: isGameActive
                ? `${currentPlayer.name}'s turn`
                : "Game over",
              isGameActive,
            };
          }

          return {
            startGame,
            handleMove,
            getGameState,
          };
        })();
        return {
          board: gameBoard.getGameBoard(),
          currentPlayer: currentPlayer.token,
          status: winner === "Draw" ? "Draw" : `${currentPlayer.name} wins!`,
          isGameActive,
        };
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      return {
        board: gameBoard.getGameBoard(),
        currentPlayer: currentPlayer.token,
        status: `${currentPlayer.name}'s turn`,
        isGameActive,
      };
    }

    return {
      board: gameBoard.getGameBoard(),
      currentPlayer: currentPlayer.token,
      status: "Invalid move",
      isGameActive,
    };
  }

  function getGameState() {
    return {
      board: gameBoard.getGameBoard(),
      currentPlayer: currentPlayer ? currentPlayer.token : null,
      status: isGameActive ? `${currentPlayer.name}'s turn` : "Game over",
      isGameActive,
    };
  }

  return {
    startGame,
    handleMove,
    getGameState,
  };
})();