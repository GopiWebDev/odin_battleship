import './styles/style.css';

import Ship from './classes/ship';
import Game from './classes/game';
import renderBoard from './DOM/renderBoard';

renderBoard();
const game = new Game('player', 'computer');
game.playerMove(0, 1);
game.playerMove(1, 1);
game.playerMove(1, 2);
game.playerMove(0, 1);
game.playerMove(0, 1);
game.playerMove(0, 1);
game.playerMove(0, 1);
game.playerMove(5, 4);
game.playerMove(5, 5);
console.log(game.player2.gameboard.board);
console.log('--------------------------------------------');
console.log(game);

// game.setupShips();
// game.playerMove(0, 1);
// game.handlePostAttack();
// game.playerMove(1, 1);
// console.log(game);
