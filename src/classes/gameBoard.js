class GameBoard {
  constructor() {
    this.board = new Array(10).fill().map(() => new Array(10).fill(null));
    this.ships = [];
  }

  placeShips(ship, startRow, startCol, orientation) {
    if (
      this.isValidPlacement(ship, startRow, startCol, orientation) &&
      !this.checkOverlap(ship, startRow, startCol, orientation)
    ) {
      const coordinates = [];

      if (orientation === 'horizontal') {
        for (let i = 0; i < ship.length; i++) {
          this.board[startRow][startCol + i] = ship;
          coordinates.push([startRow, startCol + i]);
        }
      } else if (orientation === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          this.board[startRow + i][startCol] = ship;
          coordinates.push([startRow + i, startCol]);
        }
      }

      ship.coordinates = coordinates;
      this.ships.push(ship);
      return true;
    }
    return false;
  }

  isValidPlacement(ship, startRow, startCol, orientation) {
    if (orientation === 'horizontal') {
      return startCol + ship.length <= this.board[0].length;
    } else if (orientation === 'vertical') {
      return startRow + ship.length <= this.board.length;
    }
    return false;
  }

  checkOverlap(ship, startRow, startCol, orientation) {
    if (orientation === 'horizontal') {
      for (let i = startCol; i < startCol + ship.length; i++) {
        if (this.board[startRow][i] !== null) {
          return true;
        }
      }
    } else if (orientation === 'vertical') {
      for (let i = startRow; i < startRow + ship.length; i++) {
        if (this.board[i][startCol] !== null) {
          return true;
        }
      }
    }
    return false;
  }

  receiveAttack(row, col) {
    // Check if the cell has already been attacked
    if (this.board[row][col] === 'O' || this.board[row][col] === 'X') {
      return 'Already Hit';
    }

    // If the cell contains a ship part (not null and not previously attacked)
    if (
      this.board[row][col] !== null &&
      typeof this.board[row][col] === 'object'
    ) {
      // Assuming ship parts are objects
      this.board[row][col] = 'X'; // Mark as hit
      let shipIndex = this.getShipCoordinates(row, col);

      if (shipIndex !== -1) {
        let ship = this.ships[shipIndex];
        ship.hit();

        if (ship.isSunk()) {
          return 'Sunk';
        } else {
          return 'Hit';
        }
      } else {
        return false; // In case no ship is found at the coordinates
      }
    }

    // If the cell is empty (null)
    this.board[row][col] = 'O'; // Mark as miss
    return 'Miss';
  }

  getShipCoordinates(row, col) {
    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      if (
        ship.coordinates.some(
          (coordinate) => coordinate[0] === row && coordinate[1] === col
        )
      ) {
        return i;
      }
    }
    return -1;
  }

  isAllShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

// exporting the gameboard class by default
export default GameBoard;
