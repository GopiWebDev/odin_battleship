import Ship from './ship';

class GameBoard {
  constructor() {
    // creating the 10 x 10 board
    // populated the board with 10 arrays consisting null
    this.board = new Array(10).fill([null]);
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        this.board[i][j] = j;
      }
    }
  }

  receiveAttack(coordinates) {}
}

const board = new GameBoard();
console.log(board);

// need a 10x10 board
// 5 types of ships
// carrier takes    - > 5 spaces
// battleship takes - > 4 spaces
// cruiser takes    - > 3 spaces
// submarine takes  - > 3 spaces
// destroyer takes  - > 2 spaces
// ships can't overlap
export default GameBoard;
