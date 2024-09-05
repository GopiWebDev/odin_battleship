import './styles/style.css';
import Game from './classes/game';

const playerName = document.querySelector('[data-player-name]');
const playerBoardElement = document.querySelector('.player-board');
const computerBoardElement = document.querySelector('.computer-board');
const startBtn = document.querySelector('[data-start]');
const restartBtn = document.querySelector('[data-restart]');

// Initialize the game
const game = new Game('Player', 'Computer');

// Function to render the board
function renderBoard(boardElement, gameboard) {
  boardElement.innerHTML = ''; // Clear the board

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement('div');
      cell.classList.add('divs');

      const boardCell = gameboard.board[row][col];

      if (boardCell === 'X') {
        cell.classList.add('hit');
      } else if (boardCell === 'O') {
        cell.classList.add('miss');
      } else if (boardCell !== null) {
        if (boardElement.classList[0] === 'computer-board') {
          cell.classList.add('divs');
        } else {
          cell.classList.add('ship');
        }
      }

      // Attach event listener for player moves
      if (boardElement === computerBoardElement) {
        cell.addEventListener('click', () => handlePlayerMove(row, col));
      }

      boardElement.appendChild(cell);
    }
  }
}

function handlePlayerMove(row, col) {
  if (game.currentPlayer.isComputer) return;

  const result = game.playerMove(row, col);

  // Re-render boards after the move
  renderBoard(playerBoardElement, game.player1.gameboard);
  renderBoard(computerBoardElement, game.player2.gameboard);

  // Check for game end condition
  if (game.player2.gameboard.isAllShipsSunk()) {
    alert(`${playerName.innerText} wins!`);
    removeClickListeners();
    return;
  }

  if (game.player1.gameboard.isAllShipsSunk()) {
    alert('Computer wins!');
    removeClickListeners();
  }
}

// Function to remove click listeners from the computer board
function removeClickListeners() {
  const cells = computerBoardElement.querySelectorAll('.divs');
  cells.forEach((cell) => cell.replaceWith(cell.cloneNode(true))); // Remove event listeners
}

// Event listeners for buttons
startBtn.addEventListener('click', () => {
  renderBoard(playerBoardElement, game.player1.gameboard);
  renderBoard(computerBoardElement, game.player2.gameboard);
});

restartBtn.addEventListener('click', () => {
  location.reload();
});
