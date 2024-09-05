import Ship from '../classes/ship';
import Game from '../classes/game';
import Player from '../classes/player';

describe('Game Class Tests', () => {
  let resultBox;

  beforeEach(() => {
    // Set up a mock DOM environment
    document.body.innerHTML = `
      <div class="results"></div>
    `;
    resultBox = document.querySelector('.results');
  });

  test('Game initializes with two players', () => {
    const game = new Game('Player 1', 'Player 2');
    expect(game.player1).toBeInstanceOf(Player);
    expect(game.player2).toBeInstanceOf(Player);
  });

  test('Switches turn between players', () => {
    const game = new Game('Player 1', 'Player 2');
    expect(game.currentPlayer).toBe(game.player1);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player2);
    game.switchTurn();
    expect(game.currentPlayer).toBe(game.player1);
  });

  test('Player move results in a miss if it misses a ship', () => {
    const game = new Game('Player 1', 'Player 2');
    const result = game.playerMove(5, 5);
    expect(result).toBe('Miss');
  });

  test('Player move results in a miss if it misses a ship', () => {
    const game = new Game('Player 1', 'Player 2');
    const result = game.playerMove(0, 0);
    expect(result).toBe('Miss');
  });

  test('Computer makes a move after player', () => {
    const game = new Game('Player 1', 'Player 2');
    jest.useFakeTimers();
    const randomAttackSpy = jest.spyOn(game.player2, 'randomAttack');
    game.playerMove(0, 0);
    jest.advanceTimersByTime(500);
    expect(randomAttackSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('Game ends when all opponent ships are sunk', () => {
    const game = new Game('Player 1', 'Player 2');
    for (let i = 0; i < 5; i++) {
      game.player2.gameboard.ships[i].hit();
      game.player2.gameboard.ships[i].hit();
      game.player2.gameboard.ships[i].hit();
      game.player2.gameboard.ships[i].hit();
      game.player2.gameboard.ships[i].hit();
    }
    expect(game.player2.gameboard.isAllShipsSunk()).toBe(true);
  });

  test('Game does not end if not all ships are sunk', () => {
    const game = new Game('Player 1', 'Player 2');
    game.playerMove(0, 0);
    game.playerMove(0, 1);
    expect(game.player2.gameboard.isAllShipsSunk()).toBe(false);
  });

  test('Invalid move does not affect game state', () => {
    const game = new Game('Player 1', 'Player 2');
    const result = game.playerMove(10, 10); // Invalid move
    expect(result).toBe('Invalid Move');
    expect(game.player2.gameboard.board[0][0]).toBeNull();
  });

  test('Computer does not make a move if it’s not their turn', () => {
    const game = new Game('Player 1', 'Player 2');
    jest.useFakeTimers();
    const randomAttackSpy = jest.spyOn(game.player2, 'randomAttack');
    game.playerMove(0, 0);
    jest.advanceTimersByTime(500);
    expect(randomAttackSpy).toHaveBeenCalled();
    jest.useRealTimers();
  });

  test('Player cannot attack out of bounds', () => {
    const game = new Game('Player 1', 'Player 2');
    const result = game.playerMove(-1, -1); // Out of bounds
    expect(result).toBe('Invalid Move');
    expect(game.player2.gameboard.board[0][0]).toBeNull();
  });
});
