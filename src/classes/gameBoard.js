class GameBoard {
  constructor() {
    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));
    this.ships = [];
  }

  /**
   * Places a ship on the board.
   * @param {Ship} ship - The ship to place.
   * @param {number} startRow - The starting row of the ship.
   * @param {number} startCol - The starting column of the ship.
   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
   * @returns {boolean} - Whether the ship was successfully placed.
   */
  placeShips(ship, startRow, startCol, orientation) {
    if (
      this.isValidPlacement(ship, startRow, startCol, orientation) &&
      !this.checkOverlap(ship, startRow, startCol, orientation)
    ) {
      const coordinates = [];

      for (let i = 0; i < ship.length; i++) {
        const row = orientation === 'horizontal' ? startRow : startRow + i;
        const col = orientation === 'vertical' ? startCol : startCol + i;

        this.board[row][col] = ship;
        coordinates.push([row, col]);
      }

      ship.coordinates = coordinates;
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  /**
   * Checks if a ship can be placed at the given position.
   * @param {Ship} ship - The ship to place.
   * @param {number} startRow - The starting row of the ship.
   * @param {number} startCol - The starting column of the ship.
   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
   * @returns {boolean} - Whether the placement is valid.
   */
  isValidPlacement(ship, startRow, startCol, orientation) {
    if (orientation === 'horizontal') {
      return startCol + ship.length <= this.board[0].length;
    } else if (orientation === 'vertical') {
      return startRow + ship.length <= this.board.length;
    }
    return false;
  }

  /**
   * Checks if a ship overlaps with another ship on the board.
   * @param {Ship} ship - The ship to check.
   * @param {number} startRow - The starting row of the ship.
   * @param {number} startCol - The starting column of the ship.
   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').
   * @returns {boolean} - Whether there is an overlap.
   */
  checkOverlap(ship, startRow, startCol, orientation) {
    for (let i = 0; i < ship.length; i++) {
      const row = orientation === 'horizontal' ? startRow : startRow + i;
      const col = orientation === 'vertical' ? startCol : startCol + i;

      if (this.board[row][col] !== null) {
        return true;
      }
    }
    return false;
  }

  /**
   * Processes an attack on the board.
   * @param {number} row - The row to attack.
   * @param {number} col - The column to attack.
   * @returns {string} - The result of the attack ('Hit', 'Miss', 'Already Hit', 'Sinking a ship').
   */
  receiveAttack(row, col) {
    if (this.board[row][col] === 'O' || this.board[row][col] === 'X') {
      return 'Already Hit';
    }

    const cell = this.board[row][col];
    if (cell !== null && typeof cell === 'object') {
      const ship = cell;
      ship.hit();
      this.board[row][col] = 'X';

      return ship.isSunk() ? 'Sinking a ship' : 'Hit';
    }

    this.board[row][col] = 'O'; // Mark as miss
    return 'Miss';
  }

  /**
   * Gets the index of the ship at the specified coordinates.
   * @param {number} row - The row of the ship.
   * @param {number} col - The column of the ship.
   * @returns {number} - The index of the ship, or -1 if not found.
   */
  getShipCoordinates(row, col) {
    for (let i = 0; i < this.ships.length; i++) {
      const ship = this.ships[i];
      if (ship.coordinates.some(([r, c]) => r === row && c === col)) {
        return i;
      }
    }
    return -1;
  }

  /**
   * Checks if all ships on the board have been sunk.
   * @returns {boolean} - Whether all ships are sunk.
   */
  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

export default GameBoard;
