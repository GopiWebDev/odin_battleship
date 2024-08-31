import Player from './player';
import Ship from './ship';

class Game {
  constructor(player1, player2) {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2, true);
    this.currentPlayer = this.player1;
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  playerMove(row, col) {
    const result = this.currentPlayer.attack(this.getOpponent(), row, col);
    this.updateUI(row, col, result);
    if (this.getOpponent().gameboard.isAllShipsSunk()) {
      this.endGame(this.currentPlayer.name);
    } else {
      this.switchTurn();
      if (this.currentPlayer.isComputer) {
        this.currentPlayer.randomAttack(this.getOpponent());
        this.switchTurn();
      }
    }
  }

  getOpponent() {
    return this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }
}

export default Game;
