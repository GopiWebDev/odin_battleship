import Ship from '../classes/ship';

describe('Ship class', () => {
  let ship;

  beforeEach(() => {
    // Create a new Ship instance before each test
    ship = new Ship(3); // Ship with length 3
  });

  test('should create a ship with the correct length', () => {
    expect(ship.length).toBe(3);
  });

  test('should initialize hits to 0', () => {
    expect(ship.hits).toBe(0);
  });

  test('should initialize sunk status to false', () => {
    expect(ship.isSunk()).toBe(false);
  });

  test('should increase hits by 1 when hit() is called', () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should set sunk to true when hits equal ship length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should not set sunk to true if hits are less than ship length', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  test('should not set sunk to true if hits exceed ship length', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit(); // More hits than the length
    expect(ship.isSunk()).toBe(true);
  });

  test('should handle multiple hits correctly', () => {
    ship.hit();
    ship.hit();
    expect(ship.hits).toBe(2);
    ship.hit();
    expect(ship.hits).toBe(3);
  });

  test('should be able to create ships with different lengths', () => {
    const shortShip = new Ship(2);
    const longShip = new Ship(5);
    expect(shortShip.length).toBe(2);
    expect(longShip.length).toBe(5);
  });

  test('should be able to hit a ship multiple times without affecting its initial length', () => {
    const initialLength = ship.length;
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.length).toBe(initialLength);
  });
});
