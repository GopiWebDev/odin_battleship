import Player from './player';
import Ship from './ship';

const resultBox = document.querySelector('.results');

class Game {
  constructor(player1 = 'Player', player2 = 'Computer') {
    this.player1 = new Player(player1);
    this.player2 = new Player(player2, true);
    this.currentPlayer = this.player1;
    this.gameOver = false;
    this.resultBox = resultBox || document.querySelector('.results');

    this.setupShipsForBothPlayers();
  }

  setupShipsForBothPlayers() {
    const ships = [
      new Ship(5),
      new Ship(4),
      new Ship(3),
      new Ship(3),
      new Ship(2),
    ];

    this.placeShipsForPlayer(this.player1, ships);
    this.placeShipsForPlayer(this.player2, ships);
  }

  placeShipsForPlayer(player, ships) {
    const orientations = ['horizontal', 'vertical'];

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

        placed = player.gameboard.placeShips(
          ship,
          startRow,
          startCol,
          orientation
        );
      }
    }
  }

  switchTurn() {
    if (!this.gameOver) {
      this.currentPlayer =
        this.currentPlayer === this.player1 ? this.player2 : this.player1;
    }
  }

  playerMove(row, col) {
    if (this.gameOver) return;

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
    if (this.gameOver) return;

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
    if (this.resultBox) {
      this.resultBox.innerText = `Attack at [${row}, ${col}] resulted in ${result}`;
    } else {
      resultBox.innerText = `Attack at [${row}, ${col}] resulted in ${result}`;
    }
  }

  endGame(winnerName) {
    this.gameOver = true;
    resultBox.innerText = `Game Over! ${winnerName} wins!`;
  }
}

export default Game;
