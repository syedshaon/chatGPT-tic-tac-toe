const board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");

let currentPlayer = "X";
let gameEnded = false;

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameEnded && board[index] === "") {
      board[index] = currentPlayer;
      cell.classList.add(currentPlayer.toLowerCase());
      cell.textContent = currentPlayer;
      const result = checkWinner();
      if (result !== null) {
        endGame(result);
      } else if (board.every((value) => value !== "")) {
        endGame("tie");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `It's ${currentPlayer}'s turn`;
        if (currentPlayer === "O") {
          computerPlay();
        }
      }
    }
  });
});

function checkWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

function endGame(result) {
  gameEnded = true;
  if (result === "tie") {
    message.textContent = "It's a tie";
  } else {
    message.textContent = `${result} wins!`;
  }
}

function computerPlay() {
  const bestMove = findBestMove(board, "O");
  board[bestMove] = "O";
  cells[bestMove].classList.add("o");
  cells[bestMove].textContent = "O";
  const result = checkWinner();
  if (result !== null) {
    endGame(result);
  } else if (board.every((value) => value !== "")) {
    endGame("tie");
  } else {
    currentPlayer = "X";
    message.textContent = `It's ${currentPlayer}'s turn`;
  }
}

function findBestMove(board, player) {
  const scores = { X: -1, O: 1, tie: 0 };

  function minimax(board, player) {
    const result = checkWinner();
    if (result !== null) {
      return scores[result];
    }

    let bestScore = player === "O" ? -Infinity : Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player;
        const score = minimax(board, player === "X" ? "O" : "X");
        board[i] = "";
        if (
          (player === "O" && score > bestScore) ||
          (player === "X" && score < bestScore)
        ) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  }

  return minimax(board, player);
}

message.textContent = `It's ${currentPlayer}'s turn`;
