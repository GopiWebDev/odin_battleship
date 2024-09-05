class Ship {
  /**
   * Creates a new Ship object.
   * @param {number} length - The length of the ship.
   */
  constructor(length) {
    this.length = length;
    this.hits = 0; // Number of hits received
    this.coordinates = []; // Coordinates occupied by the ship
    this.sunk = false; // Whether the ship is sunk
  }

  /**
   * Increments the hit count and checks if the ship is sunk.
   */
  hit() {
    if (!this.sunk) {
      this.hits += 1;
      this.#checkIfSunk(); // Private method to check if the ship is sunk
    }
  }

  /**
   * Checks if the ship has been sunk.
   * @private
   */
  #checkIfSunk() {
    if (this.hits === this.length) {
      this.sunk = true;
    }
  }

  /**
   * Returns whether the ship is sunk.
   * @returns {boolean} - True if the ship is sunk, otherwise false.
   */
  isSunk() {
    return this.sunk;
  }
}

export default Ship;
