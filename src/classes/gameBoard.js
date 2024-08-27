import Ship from './ship';

class GameBoard {
  constructor() {
    this.ship = {
      carrier: new Ship(5),
    };
    this.missedAttacks = [];
  }

  receiveAttack(coordinates) {}
}

// need a 10x10 board
// 5 types of ships
// carrier takes    - > 5 spaces
// battleship takes - > 4 spaces
// cruiser takes    - > 3 spaces
// submarine takes  - > 3 spaces
// destroyer takes  - > 2 spaces
// ships can't overlap
