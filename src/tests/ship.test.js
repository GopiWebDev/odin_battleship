import Ship from '../classes/ship';

describe('testing the ship class', () => {
  it('first ship length should be 5', () => {
    const newShip = new Ship(5);
    expect(newShip.length).toBe(5);
  });

  it('should return sunk true after 3 hits', () => {
    const newShip = new Ship(3);
    newShip.hit();
    newShip.hit();
    newShip.hit();
    expect(newShip.isSunk()).toBe(true);
  });

  it('should return length 5', () => {
    const newShip = new Ship(5);
    expect(newShip.length).toBe(5);
  });
});
