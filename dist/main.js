/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/classes/game.js":
/*!*****************************!*\
  !*** ./src/classes/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/classes/player.js\");\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ \"./src/classes/ship.js\");\n\n\nconst resultBox = document.querySelector('.results');\nclass Game {\n  constructor(player1 = 'Player', player2 = 'Computer') {\n    this.player1 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player1);\n    this.player2 = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](player2, true);\n    this.currentPlayer = this.player1;\n    this.gameOver = false;\n    this.resultBox = resultBox || document.querySelector('.results');\n    this.setupShipsForBothPlayers();\n  }\n  setupShipsForBothPlayers() {\n    const ships = [new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](5), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](4), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](3), new _ship__WEBPACK_IMPORTED_MODULE_1__[\"default\"](2)];\n    this.placeShipsForPlayer(this.player1, ships);\n    this.placeShipsForPlayer(this.player2, ships);\n  }\n  placeShipsForPlayer(player, ships) {\n    const orientations = ['horizontal', 'vertical'];\n    for (let ship of ships) {\n      let placed = false;\n      while (!placed) {\n        const orientation = orientations[Math.floor(Math.random() * orientations.length)];\n        const startRow = Math.floor(Math.random() * (10 - (orientation === 'horizontal' ? 0 : ship.length)));\n        const startCol = Math.floor(Math.random() * (10 - (orientation === 'vertical' ? 0 : ship.length)));\n        placed = player.gameboard.placeShips(ship, startRow, startCol, orientation);\n      }\n    }\n  }\n  switchTurn() {\n    if (!this.gameOver) {\n      this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;\n    }\n  }\n  playerMove(row, col) {\n    if (this.gameOver) return;\n    if (this.isValidMove(row, col)) {\n      const result = this.currentPlayer.attack(this.getOpponent(), row, col);\n      this.updateUI(row, col, result);\n      if (this.getOpponent().gameboard.isAllShipsSunk()) {\n        this.endGame(this.currentPlayer.name);\n      } else {\n        this.handlePostAttack();\n      }\n      return result;\n    } else {\n      console.log('Invalid move. Please try again.');\n      return 'Invalid Move';\n    }\n  }\n  isValidMove(row, col) {\n    return row >= 0 && row < 10 && col >= 0 && col < 10;\n  }\n  handlePostAttack() {\n    if (this.gameOver) return;\n    this.switchTurn();\n    if (this.currentPlayer.isComputer) {\n      const [row, col, result] = this.currentPlayer.randomAttack(this.getOpponent());\n      this.updateUI(row, col, result);\n      if (this.getOpponent().gameboard.isAllShipsSunk()) {\n        this.endGame(this.currentPlayer.name);\n      } else {\n        this.switchTurn();\n      }\n    }\n  }\n  getOpponent() {\n    return this.currentPlayer === this.player1 ? this.player2 : this.player1;\n  }\n  updateUI(row, col, result) {\n    if (this.resultBox) {\n      this.resultBox.innerText = `Attack at [${row}, ${col}] resulted in ${result}`;\n    } else {\n      resultBox.innerText = `Attack at [${row}, ${col}] resulted in ${result}`;\n    }\n  }\n  endGame(winnerName) {\n    this.gameOver = true;\n    resultBox.innerText = `Game Over! ${winnerName} wins!`;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/game.js?");

/***/ }),

/***/ "./src/classes/gameBoard.js":
/*!**********************************!*\
  !*** ./src/classes/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass GameBoard {\n  constructor() {\n    this.board = new Array(10).fill(null).map(() => new Array(10).fill(null));\n    this.ships = [];\n  }\n\n  /**\r\n   * Places a ship on the board.\r\n   * @param {Ship} ship - The ship to place.\r\n   * @param {number} startRow - The starting row of the ship.\r\n   * @param {number} startCol - The starting column of the ship.\r\n   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').\r\n   * @returns {boolean} - Whether the ship was successfully placed.\r\n   */\n  placeShips(ship, startRow, startCol, orientation) {\n    if (this.isValidPlacement(ship, startRow, startCol, orientation) && !this.checkOverlap(ship, startRow, startCol, orientation)) {\n      const coordinates = [];\n      for (let i = 0; i < ship.length; i++) {\n        const row = orientation === 'horizontal' ? startRow : startRow + i;\n        const col = orientation === 'vertical' ? startCol : startCol + i;\n        this.board[row][col] = ship;\n        coordinates.push([row, col]);\n      }\n      ship.coordinates = coordinates;\n      this.ships.push(ship);\n      return true;\n    }\n    return false;\n  }\n\n  /**\r\n   * Checks if a ship can be placed at the given position.\r\n   * @param {Ship} ship - The ship to place.\r\n   * @param {number} startRow - The starting row of the ship.\r\n   * @param {number} startCol - The starting column of the ship.\r\n   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').\r\n   * @returns {boolean} - Whether the placement is valid.\r\n   */\n  isValidPlacement(ship, startRow, startCol, orientation) {\n    if (orientation === 'horizontal') {\n      return startCol + ship.length <= this.board[0].length;\n    } else if (orientation === 'vertical') {\n      return startRow + ship.length <= this.board.length;\n    }\n    return false;\n  }\n\n  /**\r\n   * Checks if a ship overlaps with another ship on the board.\r\n   * @param {Ship} ship - The ship to check.\r\n   * @param {number} startRow - The starting row of the ship.\r\n   * @param {number} startCol - The starting column of the ship.\r\n   * @param {string} orientation - The orientation of the ship ('horizontal' or 'vertical').\r\n   * @returns {boolean} - Whether there is an overlap.\r\n   */\n  checkOverlap(ship, startRow, startCol, orientation) {\n    for (let i = 0; i < ship.length; i++) {\n      const row = orientation === 'horizontal' ? startRow : startRow + i;\n      const col = orientation === 'vertical' ? startCol : startCol + i;\n      if (this.board[row][col] !== null) {\n        return true;\n      }\n    }\n    return false;\n  }\n\n  /**\r\n   * Processes an attack on the board.\r\n   * @param {number} row - The row to attack.\r\n   * @param {number} col - The column to attack.\r\n   * @returns {string} - The result of the attack ('Hit', 'Miss', 'Already Hit', 'Sinking a ship').\r\n   */\n  receiveAttack(row, col) {\n    if (this.board[row][col] === 'O' || this.board[row][col] === 'X') {\n      return 'Already Hit';\n    }\n    const cell = this.board[row][col];\n    if (cell !== null && typeof cell === 'object') {\n      const ship = cell;\n      ship.hit();\n      this.board[row][col] = 'X';\n      return ship.isSunk() ? 'Sinking a ship' : 'Hit';\n    }\n    this.board[row][col] = 'O'; // Mark as miss\n    return 'Miss';\n  }\n\n  /**\r\n   * Gets the index of the ship at the specified coordinates.\r\n   * @param {number} row - The row of the ship.\r\n   * @param {number} col - The column of the ship.\r\n   * @returns {number} - The index of the ship, or -1 if not found.\r\n   */\n  getShipCoordinates(row, col) {\n    for (let i = 0; i < this.ships.length; i++) {\n      const ship = this.ships[i];\n      if (ship.coordinates.some(([r, c]) => r === row && c === col)) {\n        return i;\n      }\n    }\n    return -1;\n  }\n\n  /**\r\n   * Checks if all ships on the board have been sunk.\r\n   * @returns {boolean} - Whether all ships are sunk.\r\n   */\n  isAllShipsSunk() {\n    return this.ships.every(ship => ship.isSunk());\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/gameBoard.js?");

/***/ }),

/***/ "./src/classes/player.js":
/*!*******************************!*\
  !*** ./src/classes/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoard */ \"./src/classes/gameBoard.js\");\n\nclass Player {\n  /**\r\n   * Creates a new Player object.\r\n   * @param {string} name - The name of the player.\r\n   * @param {boolean} [isComputer=false] - Whether the player is a computer.\r\n   */\n  constructor(name, isComputer = false) {\n    this.name = name;\n    this.isComputer = isComputer;\n    this.gameboard = new _gameBoard__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  }\n\n  /**\r\n   * Sends an attack to the opponent's gameboard.\r\n   * @param {Player} opponent - The opponent player.\r\n   * @param {number} row - The row of the attack.\r\n   * @param {number} col - The column of the attack.\r\n   * @returns {string} - The result of the attack ('Hit', 'Miss', 'Already Hit', etc.).\r\n   */\n  attack(opponent, row, col) {\n    if (!opponent || !opponent.gameboard) {\n      throw new Error('Invalid opponent or opponent does not have a gameboard.');\n    }\n    return opponent.gameboard.receiveAttack(row, col);\n  }\n\n  /**\r\n   * Performs a random attack on the opponent's gameboard.\r\n   * @param {Player} opponent - The opponent player.\r\n   * @returns {[number, number, string]} - The row, column, and result of the attack.\r\n   */\n  randomAttack(opponent) {\n    if (this.isComputer) {\n      if (!opponent || !opponent.gameboard) {\n        throw new Error('Invalid opponent or opponent does not have a gameboard.');\n      }\n      let row, col, result;\n      let attempts = 0;\n      const maxAttempts = 100;\n      do {\n        row = Math.floor(Math.random() * 10);\n        col = Math.floor(Math.random() * 10);\n        attempts++;\n      } while ((opponent.gameboard.board[row][col] === 'O' || opponent.gameboard.board[row][col] === 'X') && attempts < maxAttempts);\n      if (attempts === maxAttempts) {\n        throw new Error('Unable to find a valid cell for attack.');\n      }\n      result = opponent.gameboard.receiveAttack(row, col);\n      return [row, col, result];\n    }\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/player.js?");

/***/ }),

/***/ "./src/classes/ship.js":
/*!*****************************!*\
  !*** ./src/classes/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  /**\r\n   * Creates a new Ship object.\r\n   * @param {number} length - The length of the ship.\r\n   */\n  constructor(length) {\n    this.length = length;\n    this.hits = 0; // Number of hits received\n    this.coordinates = []; // Coordinates occupied by the ship\n    this.sunk = false; // Whether the ship is sunk\n  }\n\n  /**\r\n   * Increments the hit count and checks if the ship is sunk.\r\n   */\n  hit() {\n    if (!this.sunk) {\n      this.hits += 1;\n      this.#checkIfSunk(); // Private method to check if the ship is sunk\n    }\n  }\n\n  /**\r\n   * Checks if the ship has been sunk.\r\n   * @private\r\n   */\n  #checkIfSunk() {\n    if (this.hits === this.length) {\n      this.sunk = true;\n    }\n  }\n\n  /**\r\n   * Returns whether the ship is sunk.\r\n   * @returns {boolean} - True if the ship is sunk, otherwise false.\r\n   */\n  isSunk() {\n    return this.sunk;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/style.css */ \"./src/styles/style.css\");\n/* harmony import */ var _classes_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/game */ \"./src/classes/game.js\");\n\n\nconst playerName = document.querySelector('[data-player-name]');\nconst playerBoardElement = document.querySelector('.player-board');\nconst computerBoardElement = document.querySelector('.computer-board');\nconst startBtn = document.querySelector('[data-start]');\nconst restartBtn = document.querySelector('[data-restart]');\n\n// Initialize the game\nconst game = new _classes_game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]('Player', 'Computer');\n\n// Function to render the board\nfunction renderBoard(boardElement, gameboard) {\n  boardElement.innerHTML = ''; // Clear the board\n\n  for (let row = 0; row < 10; row++) {\n    for (let col = 0; col < 10; col++) {\n      const cell = document.createElement('div');\n      cell.classList.add('divs');\n      const boardCell = gameboard.board[row][col];\n      if (boardCell === 'X') {\n        cell.classList.add('hit');\n      } else if (boardCell === 'O') {\n        cell.classList.add('miss');\n      } else if (boardCell !== null) {\n        if (boardElement.classList[0] === 'computer-board') {\n          cell.classList.add('divs');\n        } else {\n          cell.classList.add('ship');\n        }\n      }\n\n      // Attach event listener for player moves\n      if (boardElement === computerBoardElement) {\n        cell.addEventListener('click', () => handlePlayerMove(row, col));\n      }\n      boardElement.appendChild(cell);\n    }\n  }\n}\nfunction handlePlayerMove(row, col) {\n  if (game.currentPlayer.isComputer) return;\n  const result = game.playerMove(row, col);\n\n  // Re-render boards after the move\n  renderBoard(playerBoardElement, game.player1.gameboard);\n  renderBoard(computerBoardElement, game.player2.gameboard);\n\n  // Check for game end condition\n  if (game.player2.gameboard.isAllShipsSunk()) {\n    alert(`${playerName.innerText} wins!`);\n    removeClickListeners();\n    return;\n  }\n  if (game.player1.gameboard.isAllShipsSunk()) {\n    alert('Computer wins!');\n    removeClickListeners();\n  }\n}\n\n// Function to remove click listeners from the computer board\nfunction removeClickListeners() {\n  const cells = computerBoardElement.querySelectorAll('.divs');\n  cells.forEach(cell => cell.replaceWith(cell.cloneNode(true))); // Remove event listeners\n}\n\n// Event listeners for buttons\nstartBtn.addEventListener('click', () => {\n  renderBoard(playerBoardElement, game.player1.gameboard);\n  renderBoard(computerBoardElement, game.player2.gameboard);\n});\nrestartBtn.addEventListener('click', () => {\n  location.reload();\n});\n\n//# sourceURL=webpack://odin_battleship/./src/index.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `* {\r\n  padding: 0;\r\n  margin: 0;\r\n}\r\n\r\nbody {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: #fcde70;\r\n}\r\n\r\nh1 {\r\n  font-family: 'Big Shoulders Stencil Text', sans-serif;\r\n  font-optical-sizing: auto;\r\n  font-weight: 900;\r\n  font-style: normal;\r\n  font-size: 5em;\r\n}\r\n\r\nh2 {\r\n  text-align: center;\r\n  margin-bottom: 1em;\r\n  font-family: 'Big Shoulders Stencil Text', sans-serif;\r\n  font-size: 1.5em;\r\n}\r\n\r\n.game-boards {\r\n  width: fit-content;\r\n  display: flex;\r\n  justify-content: space-around;\r\n  padding: 2em;\r\n  margin: 1em;\r\n}\r\n\r\n.player-board,\r\n.computer-board {\r\n  width: 416px;\r\n  height: 416px;\r\n  border: 1px solid red;\r\n  padding: 10px;\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n  grid-template-rows: repeat(10, 1fr);\r\n  align-items: center;\r\n  justify-items: center;\r\n  margin: 0 4em;\r\n  background-color: #e8b86d;\r\n}\r\n\r\n.divs {\r\n  width: 40px;\r\n  height: 40px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n  background-color: #e9efec;\r\n}\r\n\r\n.round {\r\n  width: 10px;\r\n  height: 10px;\r\n  border-radius: 50%;\r\n  background-color: black;\r\n}\r\n\r\n.ship-preview {\r\n  padding: 10px;\r\n  border: 1px solid black;\r\n  width: 200px;\r\n  height: 416px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  justify-content: space-between;\r\n}\r\n\r\n.carrier {\r\n  width: 200px;\r\n  height: 40px;\r\n  background-color: red;\r\n}\r\n\r\n.battleship {\r\n  width: 160px;\r\n  height: 40px;\r\n  background-color: red;\r\n}\r\n\r\n.destroyer,\r\n.submarine {\r\n  width: 120px;\r\n  height: 40px;\r\n  background-color: red;\r\n}\r\n\r\n.patrol-boat {\r\n  width: 80px;\r\n  height: 40px;\r\n  background-color: red;\r\n}\r\n\r\n.hit {\r\n  background-color: #c7253e;\r\n}\r\n\r\n.miss {\r\n  background-color: #48cfcb;\r\n}\r\n\r\n.ship {\r\n  background-color: #1e201e;\r\n}\r\n\r\n/* CSS */\r\n.start-btn,\r\n.restart-btn {\r\n  align-items: center;\r\n  appearance: none;\r\n  background-image: radial-gradient(\r\n    100% 100% at 100% 0,\r\n    #5adaff 0,\r\n    #5468ff 100%\r\n  );\r\n  border: 0;\r\n  border-radius: 6px;\r\n  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,\r\n    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, rgba(58, 65, 111, 0.5) 0 -3px 0 inset;\r\n  box-sizing: border-box;\r\n  color: #fff;\r\n  cursor: pointer;\r\n  display: inline-flex;\r\n  font-family: 'JetBrains Mono', monospace;\r\n  height: 48px;\r\n  justify-content: center;\r\n  line-height: 1;\r\n  list-style: none;\r\n  overflow: hidden;\r\n  padding-left: 16px;\r\n  padding-right: 16px;\r\n  position: relative;\r\n  text-align: left;\r\n  text-decoration: none;\r\n  transition: box-shadow 0.15s, transform 0.15s;\r\n  user-select: none;\r\n  -webkit-user-select: none;\r\n  touch-action: manipulation;\r\n  white-space: nowrap;\r\n  will-change: box-shadow, transform;\r\n  font-size: 18px;\r\n  margin: 1em;\r\n}\r\n\r\n.start-btn:focus,\r\n.restart-btn:focus {\r\n  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,\r\n    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;\r\n}\r\n\r\n.start-btn:hover,\r\n.restart-btn:hover {\r\n  box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,\r\n    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;\r\n  transform: translateY(-2px);\r\n}\r\n\r\n.start-btn:hover,\r\n.restart-btn:active {\r\n  box-shadow: #3c4fe0 0 3px 7px inset;\r\n  transform: translateY(2px);\r\n}\r\n\r\n.results {\r\n  font-family: sans-serif;\r\n  font-size: 1.2em;\r\n  margin: 0.5em;\r\n}\r\n`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://odin_battleship/./src/styles/style.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://odin_battleship/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://odin_battleship/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ \"./node_modules/css-loader/dist/cjs.js!./src/styles/style.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\noptions.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://odin_battleship/./src/styles/style.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://odin_battleship/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;