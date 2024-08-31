// importing ship class from another file
import Ship from './ship';

class GameBoard {
  constructor() {
    // creates a 10x10 board with null inside it
    this.board = new Array(10).fill().map(() => new Array(10).fill(null));
    this.ships = this.initializeShips();
  }

  initializeShips() {
    return [new Ship(5), new Ship(4), new Ship(3), new Ship(3), new Ship(2)];
  }

  // function to place the ships on the desired coordinates
  // takes, ship, startRow, startCol and orientation as argument
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
      return true;
    }
    return false;
  }

  // checks if the coordinates are valid according to ships length
  // if trying to place a ship of length 5 at 9th col will give 9 + 5 is 14 which is greater than board length (10)
  isValidPlacement(ship, startRow, startCol, orientation) {
    // if the oientation is horizontal checks the column
    if (orientation === 'horizontal') {
      return startCol + ship.length <= this.board[0].length;
    }
    // if the orientation is vertical it'll check from rows
    else if (orientation === 'vertical') {
      return startRow + ship.length <= this.board.length;
    }
    // will return false if the ship can't be placed
    return false;
  }

  // checks for overlap of another ship over current ship
  checkOverlap(ship, startRow, startCol, orientation) {
    // if the orientation is horizontal
    if (orientation === 'horizontal') {
      // loops from starting col till the col + ship length
      for (let i = startCol; i < startCol + ship.length; i++) {
        // if any place during is found not null means there is a ship already and overlapping
        if (this.board[startRow][i] !== null) {
          return true;
        }
      }
    }
    // same with vertical orientation
    else if (orientation === 'vertical') {
      for (let i = startRow; i < startRow + ship.length; i++) {
        if (this.board[i][startCol] !== null) {
          return true;
        }
      }
    } else {
      // returns false if no overalapping is found
      return false;
    }
  }

  // receive attack takes a coordinate of row and col
  receiveAttack(row, col) {
    // cell is the target location on the board
    let cell = this.board[row][col];
    // Miss = O, Hit = X
    // checks if it's already hit of miss and returns false if any one is true
    if (cell === 'O' || cell === 'X') {
      return false;
    }

    // if cell is not null means there is a ship present in that place
    if (cell !== null) {
      // marks the location as hit
      this.board[row][col] = 'X';
      // gets the index of the ship to retrieve the ship class
      let shipIndex = this.getShipCoordinates(row, col);
      // if index return value is not -1
      if (shipIndex !== -1) {
        // then the ship is in ships array of that index
        let ship = this.ships[shipIndex];
        // increasing the hit of that ship by 1
        ship.hit();
        // checks if the ship is sunk
        if (ship.isSunk()) {
          // returns sunk if true
          return 'Sunk';  
        } else {
          // else returns hit
          return 'Hit';
        }
      } else {
        // returns false if ship index is -1
        return false;
      }
    }

    // if no ship found means marks it as Miss and returns it
    this.board[row][col] = 'O';
    return 'Miss';
  }

  // gets the ship coordinate with help of location hit
  getShipCoordinates(row, col) {
    // loops through all of the ships array
    for (let i = 0; i < this.ships.length; i++) {
      let ship = this.ships[i];
      // checks if any ship's coordinate matches with the target and if found returns the index of that ship which is i
      if (
        ship.coordinates.some(
          // coordinate[0] denotes row and coordinate[1] denotes column
          (coordinate) => coordinate[0] === row && coordinate[1] === col
        )
      ) {
        return i;
      }
    }
    // if no ship found it returns  -1
    return -1;
  }

  // checks if all the ships in the array are sunk
  isAllShipsSunk() {
    // calls the isSunk function for every ship
    return this.ships.every((ship) => ship.isSunk());
  }
}

// exporting the gameboard class by default
export default GameBoard;
