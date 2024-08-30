import GameBoard from '../classes/gameBoard';
import Ship from '../classes/ship';

describe('testing gameboard', () => {
  const gameboard = new GameBoard();

  it('should return null', () => {
    expect(gameboard.board[0][0]).toBeNull();
  });

  it('should return null', () => {
    expect(gameboard.board[0][1]).toBeNull();
  });

  it('should return null', () => {
    expect(gameboard.board[0][9]).toBeNull();
  });

  it('should return length of 10', () => {
    expect(gameboard.board.length).toBe(10);
  });

  it('should return length of 10 for every row', () => {
    gameboard.board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });
});

describe('testing ship placements', () => {
  it('should place ship horizontally on board', () => {
    const grid = new GameBoard();
    const ship = new Ship(4);
    grid.placeShips(ship, 0, 0, 'horizontal');
    expect(ship.coordinates).toEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ]);
  });

  it('should place the ship vertically', () => {
    const grid = new GameBoard();
    const ship = new Ship(4);
    grid.placeShips(ship, 0, 0, 'vertical');
    expect(ship.coordinates).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ]);
  });

  it('ship should not overlap another ship', () => {
    const grid = new GameBoard();
    const ship = new Ship(4);
    const secondShip = new Ship(5);
    grid.placeShips(ship, 0, 0, 'vertical');
    expect(grid.placeShips(secondShip, 2, 0, 'vertical')).toBeFalsy();
  });

  it('should not go out of board', () => {
    const grid = new GameBoard();
    const ship = new Ship(5);
    expect(grid.placeShips(ship, 7, 6, 'horizontal')).toBeFalsy();
  });

  it('should place ship on the board', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    expect(board.board[0][0]).toBe(ship);
  });
});

describe('testing attacks', () => {
  it('should miss if no ship is present', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    expect(board.receiveAttack(1, 0)).toBe('Miss');
  });

  it('should hit if ship is present and increase the hits', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    expect(ship.hits).toBe(2);
  });

  it('should mark miss if no ships were present', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    expect(board.receiveAttack(6, 5)).toBe('Miss');
  });

  it('should return false if the coordinate has been already hit', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    board.receiveAttack(6, 5);
    expect(board.receiveAttack(6, 5)).toBeFalsy();
  });

  it('should return false if all ships are not sunk', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    expect(board.isAllShipsSunk()).toBeFalsy();
  });

  it('should return true if all ships are sunk', () => {
    const board = new GameBoard();
    const ship = new Ship(3);
    board.placeShips(ship, 0, 0, 'horizontal');
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 1);
    board.receiveAttack(0, 2);
    board.ships.forEach((ship) => {
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
    });
    expect(board.isAllShipsSunk()).toBeTruthy();
  });
});
