import Player from '../classes/player';
import GameBoard from '../classes/gameBoard';
import Ship from '../classes/ship';

describe('Player', () => {
  let player1, player2;

  beforeEach(() => {
    player1 = new Player('Player 1');
    player2 = new Player('Player 2', true); // Computer player
  });

  test("player can attack opponent's board", () => {
    const ship = new Ship(3);
    player2.gameboard.placeShip(ship, 0, 0, 'horizontal');
    const result = player1.attack(player2, 0, 0);
    expect(result).toBe('Hit');
    expect(ship.hits).toBe(1);
  });

  test('computer player can make a random attack', () => {
    const mockAttack = jest.spyOn(player2, 'attack');
    player2.randomAttack(player1);
    expect(mockAttack).toHaveBeenCalled();
  });

  test('computer player attacks a valid position', () => {
    const initialAttacks = [];
    for (let i = 0; i < 100; i++) {
      const result = player2.randomAttack(player1);
      if (result) initialAttacks.push(result);
    }
    expect(initialAttacks).toContain('Miss');
  });
});
