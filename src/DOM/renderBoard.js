import GameBoard from '../classes/gameBoard';

const container = document.querySelector('.container');
const renderBoard = () => {
  const h1 = document.createElement('h1');
  h1.innerText = 'Battleship';

  container.appendChild(h1);
  const playerDiv = document.createElement('div');
  playerDiv.classList.add('player');
  container.appendChild(playerDiv);
};

export default renderBoard;
