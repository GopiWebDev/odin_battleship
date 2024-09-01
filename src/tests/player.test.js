import Player from '../classes/player';
import GameBoard from '../classes/gameBoard';
import Ship from '../classes/ship';

test('Player creation', () => {
  const player = new Player('Player 1');
  expect(player.name).toBe('Player 1');
  expect(player.isComputer).toBe(false);
  expect(player.gameboard).toBeInstanceOf(GameBoard);
});

test('Computer player creation', () => {
  const computer = new Player('Computer', true);
  expect(computer.name).toBe('Computer');
  expect(computer.isComputer).toBe(true);
});

test('Player can attack opponent’s board', () => {
  const player1 = new Player('Player 1');
  const player2 = new Player('Player 2');

  const ship = new Ship(3);
  player2.gameboard.placeShips(ship, 0, 0, 'horizontal');

  const result = player1.attack(player2, 0, 0);
  expect(result).toBe('Hit');
  expect(ship.hits).toBe(1);
});

test('Player attack misses', () => {
  const player1 = new Player('Player 1');
  const player2 = new Player('Player 2');

  const ship = new Ship(3);
  player2.gameboard.placeShips(ship, 0, 0, 'horizontal');

  const result = player1.attack(player2, 1, 1); // Attack a cell without a ship
  expect(result).toBe('Miss');
});

test('Repeated attack on the same cell', () => {
  const player1 = new Player('Player 1');
  const player2 = new Player('Player 2');

  const ship = new Ship(3);
  player2.gameboard.placeShips(ship, 0, 0, 'horizontal');

  player1.attack(player2, 0, 0); // First attack
  const result = player1.attack(player2, 0, 0); // Second attack
  expect(result).toBe(false); // Expect false for already hit cell
});

test('Computer player makes random attack', () => {
  const computer = new Player('Computer', true);
  const player = new Player('Player 1');

  const result = computer.randomAttack(player);
  expect(['Hit', 'Miss'].includes(result)).toBe(true);
});

test('Place ship on the game board', () => {
  const player = new Player('Player 1');
  const ship = new Ship(3);

  const placed = player.gameboard.placeShips(ship, 0, 0, 'horizontal');
  expect(placed).toBe(true);
  expect(ship.coordinates).toEqual([
    [0, 0],
    [0, 1],
    [0, 2],
  ]);
});

test('Invalid ship placement should fail', () => {
  const player = new Player('Player 1');
  const ship = new Ship(5); // Ship length 5

  const placed = player.gameboard.placeShips(ship, 0, 8, 'horizontal'); // Out of bounds
  expect(placed).toBe(false);
});

test('Ships should not overlap', () => {
  const player = new Player('Player 1');
  const ship1 = new Ship(3);
  const ship2 = new Ship(3);

  player.gameboard.placeShips(ship1, 0, 0, 'horizontal');
  const placed = player.gameboard.placeShips(ship2, 0, 1, 'horizontal'); // Overlaps with ship1

  expect(placed).toBe(false);
});

test('Check if all ships are sunk', () => {
  const player = new Player('Player 1');
  const ship = new Ship(3);

  player.gameboard.placeShips(ship, 0, 0, 'horizontal');

  player.attack(player, 0, 0);
  player.attack(player, 0, 1);
  player.attack(player, 0, 2);

  expect(player.gameboard.isAllShipsSunk()).toBe(true);
});
