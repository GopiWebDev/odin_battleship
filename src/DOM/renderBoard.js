const renderBoard = () => {
  const playerBoard = document.querySelector('.player-board');
  const computerBoard = document.querySelector('.computer-board');

  for (let i = 0; i < 10 * 10; i++) {
    const block = document.createElement('div');
    block.classList.add('divs');
    computerBoard.append(block);
  }
  for (let i = 0; i < 10 * 10; i++) {
    const block = document.createElement('div');
    block.classList.add('divs');
    playerBoard.append(block);
  }
};

export default renderBoard;
