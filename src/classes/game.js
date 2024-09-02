import Player from './player';
import Ship from './ship';

class Game {
  constructor(player1 = 'Player', player2 = 'Computer') {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2, true);
    this.currentPlayer = this.player1;

    this.setupShips();
  }

  setupShips() {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    // Place ships for player1
    for (let i = 0; i < ships.length; i++) {
      this.player1.gameboard.placeShips(ships[i], i, i, 'horizontal');
    }

    // Place ships for player2 (computer)
    for (let i = 0; i < ships.length; i++) {
      this.player2.gameboard.placeShips(ships[i], i, i + 1, 'vertical');
    }
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  playerMove(row, col) {
    if (this.isValidMove(row, col)) {
      const result = this.currentPlayer.attack(this.getOpponent(), row, col);
      this.updateUI(row, col, result);

      if (this.getOpponent().gameboard.isAllShipsSunk()) {
        this.endGame(this.currentPlayer.name);
      } else {
        this.handlePostAttack();
      }

      return result;
    } else {
      console.log('Invalid move. Please try again.');
      return 'Invalid Move';
    }
  }

  isValidMove(row, col) {
    return row >= 0 && row < 10 && col >= 0 && col < 10;
  }

  handlePostAttack() {
    this.switchTurn();
    if (this.currentPlayer.isComputer) {
      const [row, col, result] = this.currentPlayer.randomAttack(
        this.getOpponent()
      );
      this.updateUI(row, col, result);
      if (this.getOpponent().gameboard.isAllShipsSunk()) {
        this.endGame(this.currentPlayer.name);
      } else {
        this.switchTurn();
      }
    }
  }

  getOpponent() {
    return this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  updateUI(row, col, result) {
    console.log(`Attack at [${row}, ${col}] resulted in ${result}`);
  }

  endGame(winnerName) {
    console.log(`Game Over! ${winnerName} wins!`);
  }
}

export default Game;
