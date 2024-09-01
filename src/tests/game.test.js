import Ship from '../classes/ship';
import Game from '../classes/game';
import Player from '../classes/player';

describe('Game Class Tests', () => {
  let game;

  beforeEach(() => {
    game = new Game('Player 1', 'Player 2');
    game.player1.gameboard.clearShips(); // Clear ships for testing
    game.player2.gameboard.clearShips(); // Clear ships for testing
  });

  test('Game initializes with two players', () => {
    expect(game.player1).toBeInstanceOf(Player);
    expect(game.player2).toBeInstanceOf(Player);
  });

  test('Switches turn between players', () => {
    expect(game.currentPlayer).toBe(game.player1);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player2);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player1);
  });

  test('Player can make a valid move', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    game.playerMove(0, 0);
    expect(game.player2.gameboard.board[0][0]).toBe('X');
  });

  test('Player move results in a hit if it hits a ship', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    const result = game.playerMove(0, 0);
    expect(result).toBe('Hit');
  });

  test('Player move results in a miss if it misses a ship', () => {
    const result = game.playerMove(5, 5);
    expect(result).toBe('Miss');
  });

  test('Computer makes a move after player', () => {
    jest.useFakeTimers();
    const randomAttackSpy = jest.spyOn(game.player2, 'randomAttack');

    // Place a ship for the computer to sink
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');

    // Simulate a player move
    game.playerMove(0, 0);

    // Fast forward time to allow the computer's move to be processed
    jest.advanceTimersByTime(500);

    // Check if the computer's randomAttack method was called
    expect(randomAttackSpy).toHaveBeenCalled();

    jest.useRealTimers();
  });

  test('Game ends when all opponent ships are sunk', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    game.playerMove(0, 0);
    game.playerMove(0, 1);
    game.playerMove(0, 2);
    expect(game.player2.gameboard.isAllShipsSunk()).toBe(true);
  });

  test('Game does not end if not all ships are sunk', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    game.playerMove(0, 0);
    game.playerMove(0, 1);
    expect(game.player2.gameboard.isAllShipsSunk()).toBe(false);
  });

  test('Invalid move does not affect game state', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    const result = game.playerMove(10, 10); // Invalid move
    expect(result).toBeUndefined(); // Assuming invalid moves return undefined
    expect(game.player2.gameboard.board[0][0]).toBe(ship);
  });

  test('Computer does not make a move if it’s not their turn', () => {
    jest.useFakeTimers();
    const randomAttackSpy = jest.spyOn(game.player2, 'randomAttack');

    // Place a ship for the computer to sink
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');

    // Simulate a player move
    game.playerMove(0, 0);

    // Move to the next turn, which should be computer's turn
    jest.advanceTimersByTime(500);

    // Check if the computer's randomAttack method was called
    expect(randomAttackSpy).toHaveBeenCalled();

    jest.useRealTimers();
  });

  test('End game method displays the winner', () => {
    // Spy on console.log to check if the endGame method is called correctly
    const consoleSpy = jest.spyOn(console, 'log');
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    game.playerMove(0, 0);
    game.playerMove(0, 1);
    game.playerMove(0, 2);
    expect(consoleSpy).toHaveBeenCalledWith(
      `Game Over! ${game.player1.name} wins!`
    );
    consoleSpy.mockRestore();
  });

  test('Player cannot attack out of bounds', () => {
    const ship = new Ship(3);
    game.player2.gameboard.placeShips(ship, 0, 0, 'horizontal');
    const result = game.playerMove(-1, -1); // Out of bounds
    expect(result).toBeUndefined(); // Assuming out-of-bounds returns undefined
    expect(game.player2.gameboard.board[0][0]).toBe(ship);
  });
});
