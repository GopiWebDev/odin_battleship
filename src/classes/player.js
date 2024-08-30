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
    // works only if it's a computer
    if (this.isComputer) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      return this.attack(opponent, row, col);
    }
  }
}

// exporting player by default
export default Player;
