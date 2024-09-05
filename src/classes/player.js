import GameBoard from './gameBoard';

class Player {
  /**
   * Creates a new Player object.
   * @param {string} name - The name of the player.
   * @param {boolean} [isComputer=false] - Whether the player is a computer.
   */
  constructor(name, isComputer = false) {
    this.name = name;
    this.isComputer = isComputer;
    this.gameboard = new GameBoard();
  }

  /**
   * Sends an attack to the opponent's gameboard.
   * @param {Player} opponent - The opponent player.
   * @param {number} row - The row of the attack.
   * @param {number} col - The column of the attack.
   * @returns {string} - The result of the attack ('Hit', 'Miss', 'Already Hit', etc.).
   */
  attack(opponent, row, col) {
    if (!opponent || !opponent.gameboard) {
      throw new Error(
        'Invalid opponent or opponent does not have a gameboard.'
      );
    }
    return opponent.gameboard.receiveAttack(row, col);
  }

  /**
   * Performs a random attack on the opponent's gameboard.
   * @param {Player} opponent - The opponent player.
   * @returns {[number, number, string]} - The row, column, and result of the attack.
   */
  randomAttack(opponent) {
    if (this.isComputer) {
      if (!opponent || !opponent.gameboard) {
        throw new Error(
          'Invalid opponent or opponent does not have a gameboard.'
        );
      }

      let row, col, result;
      let attempts = 0;
      const maxAttempts = 100;

      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        attempts++;
      } while (
        (opponent.gameboard.board[row][col] === 'O' ||
          opponent.gameboard.board[row][col] === 'X') &&
        attempts < maxAttempts
      );

      if (attempts === maxAttempts) {
        throw new Error('Unable to find a valid cell for attack.');
      }

      result = opponent.gameboard.receiveAttack(row, col);
      return [row, col, result];
    }
  }
}

export default Player;
