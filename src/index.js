import './styles/style.css';
import Game from './classes/game';

function renderBoard(boardElement, gameboard) {
  // Clear the board
  boardElement.innerHTML = '';

  // Render each cell
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
        }
        cell.classList.add('ship');
      }

      // Attach event listener for player moves
      if (boardElement.classList[0] === 'computer-board') {
        cell.addEventListener('click', () => handlePlayerMove(row, col));
      }

      boardElement.appendChild(cell);
    }
  }
}

function handlePlayerMove(row, col) {
  const result = game.playerMove(row, col);

  // Re-render both boards after the move
  renderBoard(document.querySelector('.player-board'), game.player1.gameboard);
  renderBoard(
    document.querySelector('.computer-board'),
    game.player2.gameboard
  );

  if (result === 'Sunk') {
    console.log('You sunk a ship!');
  } else if (result === 'Hit') {
    console.log('Hit!');
  } else if (result === 'Miss') {
    console.log('Miss!');
  } else if ('Already Hit') {
    
  }

  // Check if game over
  if (game.player2.gameboard.isAllShipsSunk()) {
    alert(`${game.currentPlayer.name} wins!`);
  }
}

const playerName = document.querySelector('[data-player-name]');
const name = prompt('ENTER YOUR NAME');
playerName.innerText = name;

const game = new Game('Player 1', 'Computer');
renderBoard(document.querySelector('.player-board'), game.player1.gameboard);
renderBoard(document.querySelector('.computer-board'), game.player2.gameboard);
