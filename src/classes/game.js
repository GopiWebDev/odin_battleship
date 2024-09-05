import Player from './player';
import Ship from './ship';

const resultBox = document.querySelector('.results');

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

    const orientations = ['horizontal', 'vertical'];

    // Place ships for player1
    for (let ship of ships) {
      let placed = false;
      while (!placed) {
        const orientation =
          orientations[Math.floor(Math.random() * orientations.length)];
        const startRow = Math.floor(
          Math.random() *
            (10 - (orientation === 'horizontal' ? 0 : ship.length))
        );
        const startCol = Math.floor(
          Math.random() * (10 - (orientation === 'vertical' ? 0 : ship.length))
        );

        placed = this.player1.gameboard.placeShips(
          ship,
          startRow,
          startCol,
          orientation
        );
      }
    }

    // Place ships for player2 (computer)
    for (let ship of ships) {
      let placed = false;
      while (!placed) {
        const orientation =
          orientations[Math.floor(Math.random() * orientations.length)];
        const startRow = Math.floor(
          Math.random() *
            (10 - (orientation === 'horizontal' ? 0 : ship.length))
        );
        const startCol = Math.floor(
          Math.random() * (10 - (orientation === 'vertical' ? 0 : ship.length))
        );

        placed = this.player2.gameboard.placeShips(
          ship,
          startRow,
          startCol,
          orientation
        );
      }
    }
  }

  switchTurn() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  playerMove(row, col) {
    if (this.isValidMove(row, col)) {
      const result = this.currentPlayer.attack(this.getOpponent(), row, col);
      if (result === 'Already Hit') {
        this.updateUI(row, col, 'Already Hit');
        return;
      }
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
    resultBox.innerText = `Attack at [${row}, ${col}] resulted in ${result}`;
  }

  endGame(winnerName) {
    resultBox.innerText = `Game Over! ${winnerName} wins!`;
  }
}

export default Game;
