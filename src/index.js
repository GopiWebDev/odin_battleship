import './styles/style.css';

import Ship from './classes/ship';
import Game from './classes/game';
import renderBoard from './DOM/renderBoard';
import GameBoard from './classes/gameBoard';

renderBoard();

const game = new Game();
game.playerMove(0, 1);
game.playerMove(1, 1);
game.playerMove(2, 1);
game.playerMove(3, 1);
game.playerMove(4, 1);

game.playerMove(1, 2);
game.playerMove(2, 2);
game.playerMove(3, 2);
game.playerMove(4, 2);

game.playerMove(2, 3);
game.playerMove(3, 3);
game.playerMove(4, 3);

game.playerMove(3, 4);
game.playerMove(4, 4);

game.playerMove(4, 5);
game.playerMove(5, 5);
game.playerMove(5, 4);

console.log(game.player2.gameboard.board);
