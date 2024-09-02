import GameBoard from './gameBoard';
class Player {
  // constructor takes name and isComputer is set to false by default
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new GameBoard();
  }

  //   attack function sends receiveAttack to opponent's board
  attack(opponent, row, col) {
    return opponent.gameboard.receiveAttack(row, col);
  }

  // randomAttack generates random rows and col to attack
  randomAttack(opponent) {
    if (this.isComputer) {
      let row, col;

      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (
        opponent.gameboard.board[row][col] === 'O' ||
        opponent.gameboard.board[row][col] === 'X'
      );

      const result = opponent.gameboard.receiveAttack(row, col);
      return [row, col, result];
    }
  }
}

// exporting player by default
export default Player;
