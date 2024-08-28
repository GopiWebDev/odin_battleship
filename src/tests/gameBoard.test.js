import GameBoard from '../classes/gameBoard';

describe('testing gameboard', () => {
  const gameboard = new GameBoard();

  it('should return 0', () => {
    expect(gameboard.board[0][0]).toBe(0);
  });

  it('should return 1', () => {
    expect(gameboard.board[0][1]).toBe(1);
  });

  it('should return 9', () => {
    expect(gameboard.board[0][9]).toBe(9);
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
