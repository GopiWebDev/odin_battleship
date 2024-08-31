import Game from '../classes/game';
import Player from '../classes/player';
import Ship from '../classes/ship';
import GameBoard from '../classes/gameBoard';

// Mock Ship class to avoid dependencies in tests
jest.mock('../classes/ship', () => {
  return jest.fn().mockImplementation((length) => {
    return {
      length,
      hits: 0,
      coordinates: [],
      sunk: false,
      hit() {
        this.hits += 1;
        if (this.hits >= this.length) this.sunk = true;
      },
      isSunk() {
        return this.sunk;
      },
    };
  });
});

describe('Game', () => {
  let game;
  let player1;
  let player2;
  let ship;

  beforeEach(() => {
    // Initialize game with two players
    player1 = 'Player 1';
    player2 = 'Player 2';
    game = new Game(player1, player2);

    // Add some ships to players' boards
    ship = new Ship(3);
    game.player1.gameboard.placeShips(ship, 0, 0, 'horizontal');
    game.player2.gameboard.placeShips(ship, 1, 1, 'vertical');
  });

  test('should switch turns between players', () => {
    expect(game.currentPlayer.name).toBe(player1);
    game.switchTurn();
    expect(game.currentPlayer.name).toBe(player2);
    game.switchTurn();
    expect(game.currentPlayer.name).toBe(player1);
  });

  test('should handle player attacks and switch turns', () => {
    const opponent = game.getOpponent();
    const attackResult = game.currentPlayer.attack(opponent, 1, 1);

    // Expect the attack result to be 'Hit'
    expect(attackResult).toBe('Hit');
    // Switch turn to the next player
    game.switchTurn();
    expect(game.currentPlayer.name).toBe(player2);
  });

  test('should end game when all ships are sunk', () => {
    // Place ships so that player 1's ship is sunk
    ship.coordinates = [
      [0, 0],
      [0, 1],
      [0, 2],
    ];
    ship.hit();
    ship.hit();
    ship.hit();

    // Make player 1 attack until all ships are sunk
    game.player1.attack(game.player2, 1, 1);
    game.player1.attack(game.player2, 2, 1);

    // End game
    expect(game.getOpponent().gameboard.isAllShipsSunk()).toBe(true);
    expect(game.currentPlayer.name).toBe(player2);
  });

  test('should make random attacks for computer player', () => {
    // Mock randomAttack method to return a known value for testing
    game.player2.randomAttack = jest.fn().mockReturnValue('Miss');

    // Perform random attack
    const attackResult = game.player2.randomAttack(game.player1);

    // Expect the result of random attack to be 'Miss'
    expect(attackResult).toBe('Miss');
    expect(game.player2.randomAttack).toHaveBeenCalled();
  });

  test('should handle computer player attacking', () => {
    const opponent = game.getOpponent();
    game.currentPlayer.randomAttack(opponent);

    // Expect that a random attack was made
    expect(game.currentPlayer.isComputer).toBe(true);
    expect(game.currentPlayer.randomAttack).toHaveBeenCalled();
  });

  test('should hit if ship is present and increase the hits', () => {
    const player1 = new Player('Player 1');
    const player2 = new Player('Player 2', true); // Assume player 2 is computer

    // Place a ship on player1's board
    const ship = new Ship(3);
    player1.gameboard.placeShips(ship, 0, 0, 'horizontal');

    // Player 2 attacks player 1
    const result = player2.attack(player1, 0, 0);

    // Check the result
    expect(result).toBe('Hit');
    expect(ship.hits).toBe(1);

    // Player 2 attacks again to check for hit on same ship
    const result2 = player2.attack(player1, 1, 0);
    expect(result2).toBe('Hit');
    expect(ship.hits).toBe(2);

    // Player 2 attacks to check if it gets Miss
    const result3 = player2.attack(player1, 9, 9); // A cell that doesn't have a ship
    expect(result3).toBe('Miss');
  });
});
