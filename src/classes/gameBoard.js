import Ship from './ship';

class GameBoard {
  constructor() {
    // creating the 10 x 10 board
    // populated the board with 10 arrays consisting 10 null inside each array
    this.board = new Array(10).fill().map(() => new Array(10).fill(null));
  }

  placeShips(ship, startRow, startCol, orientation) {
    if (
      this.isValidPlacement(ship, startRow, startCol, orientation) &&
      !this.checkOverlap(ship, startRow, startCol, orientation)
    ) {
      let coordinates = [];

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
      return true;
    } else {
      return false;
    }
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
    if (this.board[row][col] === 'O' || this.board[row][col] === 'X') {
      return false;
    }

    let cell = this.board[row][col];
    if (cell !== null) {
      this.board[row][col] = 'X';
      let ship = this.getShipCoordinates(row, col);

      if (ship) {
        ship.hit();
        if (ship.isSunk()) {
          return 'Sunk';
        } else {
          return 'Hit';
        }
      } else {
        return false;
      }
    }

    this.board[row][col] = 'O';
    return 'Miss';
  }

  getShipCoordinates(row, col) {
    return this.board[row][col];
  }
}

export default GameBoard;
