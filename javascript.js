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

  function startGame(player1Name = "Player 1", player2Name = "Player 2") {
    gameBoard.clearGameBoard();
    player1 = player(player1Name, "X");
    player2 = player(player2Name, "O");
    currentPlayer = player1;
    isGameActive = true;

    return {
      board: gameBoard.getGameBoard(),
      currentPlayer: currentPlayer.token,
      status: `${player1Name}'s turn`,
      isGameActive,
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
        console.log(
          winner === "Draw"
            ? "The game is a draw!"
            : `${currentPlayer.name} (${winner}) wins!`
        ); // Added console log
        const game = (function () {
          let player1, player2, currentPlayer;
          let isGameActive = false;

          function startGame(
            player1Name = "Player 1",
            player2Name = "Player 2"
          ) {
            gameBoard.clearGameBoard();
            player1 = player(player1Name, "X");
            player2 = player(player2Name, "O");
            currentPlayer = player1;
            isGameActive = true;

            return {
              board: gameBoard.getGameBoard(),
              currentPlayer: currentPlayer.token,
              status: `${player1Name}'s turn`,
              isGameActive,
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

const displayController = (function () {
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const newGameBtn = document.getElementById("new-game");
  const player1Input = document.getElementById("player1-name");
  const player2Input = document.getElementById("player2-name");

  function displayGame(gameState) {
    // Update board cells
    gameState.board.forEach((value, index) => {
      document.querySelector(`.cell[data-index="${index}"]`).textContent =
        value;
    });
    // Update status
    status.textContent = gameState.status;
    // Disable board clicks when game is over
    board.style.pointerEvents = gameState.isGameActive ? "auto" : "none";
  }

  function getPlayerNames() {
    const player1Name = player1Input.value.trim() || "Player 1";
    const player2Name = player2Input.value.trim() || "Player 2";
    return { player1Name, player2Name };
  }

  function initialize() {
    // Handle cell clicks
    board.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        const index = parseInt(cell.dataset.index);
        const result = game.handleMove(index);
        displayGame(result);
      });
    });

    // Handle new game button
    newGameBtn.addEventListener("click", () => {
      const { player1Name, player2Name } = getPlayerNames();
      const result = game.startGame(player1Name, player2Name);
      displayGame(result);
    });

    // Initial display
    displayGame(game.startGame());
  }

  return {
    initialize,
    displayGame,
  };
})();

displayController.initialize();
