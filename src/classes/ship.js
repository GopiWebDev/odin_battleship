// Ship class
class Ship {
  // creating a new ship with length as parameter, remaining are default
  constructor(length) {
    this.length = length;
    // to count the hits and of the ship
    this.hits = 0;
    // location of the ship, first no denotes row and second denotes col
    this.coordinates = [];
    // checking if ship is sunlk
    this.sunk = false;
  }

  // increases the hits count and sets sunk to true if it's equal to the length of ship
  hit() {
    if (!this.isSunk) this.hits += 1;
  }

  // returns the sunk
  isSunk() {
    if (this.hits === this.length) this.sunk = true;
    return this.sunk;
  }
}

// exporting the class by default
export default Ship;
