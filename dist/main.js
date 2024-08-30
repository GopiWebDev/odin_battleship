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

/***/ "./src/classes/gameBoard.js":
/*!**********************************!*\
  !*** ./src/classes/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ \"./src/classes/ship.js\");\n\nclass GameBoard {\n  constructor() {\n    // creating the 10 x 10 board\n    // populated the board with 10 arrays consisting 10 null inside each array\n    this.board = new Array(10).fill().map(() => new Array(10).fill(null));\n    this.ships = [];\n  }\n  placeShips(ship, startRow, startCol, orientation) {\n    this.ships.push(ship);\n    if (this.isValidPlacement(ship, startRow, startCol, orientation) && !this.checkOverlap(ship, startRow, startCol, orientation)) {\n      let coordinates = [];\n      if (orientation === 'horizontal') {\n        for (let i = 0; i < ship.length; i++) {\n          this.board[startRow][startCol + i] = ship;\n          coordinates.push([startRow, startCol + i]);\n        }\n      } else if (orientation === 'vertical') {\n        for (let i = 0; i < ship.length; i++) {\n          this.board[startRow + i][startCol] = ship;\n          coordinates.push([startRow + i, startCol]);\n        }\n      }\n      ship.coordinates = coordinates;\n      return true;\n    } else {\n      return false;\n    }\n  }\n  isValidPlacement(ship, startRow, startCol, orientation) {\n    if (orientation === 'horizontal') {\n      return startCol + ship.length <= this.board[0].length;\n    } else if (orientation === 'vertical') {\n      return startRow + ship.length <= this.board.length;\n    }\n    return false;\n  }\n  checkOverlap(ship, startRow, startCol, orientation) {\n    if (orientation === 'horizontal') {\n      for (let i = startCol; i < startCol + ship.length; i++) {\n        if (this.board[startRow][i] !== null) {\n          return true;\n        }\n      }\n    } else if (orientation === 'vertical') {\n      for (let i = startRow; i < startRow + ship.length; i++) {\n        if (this.board[i][startCol] !== null) {\n          return true;\n        }\n      }\n    }\n    return false;\n  }\n  receiveAttack(row, col) {\n    if (this.board[row][col] === 'O' || this.board[row][col] === 'X') {\n      return false;\n    }\n    let cell = this.board[row][col];\n    if (cell !== null) {\n      this.board[row][col] = 'X';\n      let shipIndex = this.getShipCoordinates(row, col);\n      if (shipIndex !== -1) {\n        let ship = this.ships[shipIndex];\n        ship.hit();\n        if (ship.isSunk()) {\n          return 'Sunk';\n        } else {\n          return 'Hit';\n        }\n      } else {\n        return false;\n      }\n    }\n    this.board[row][col] = 'O';\n    return 'Miss';\n  }\n  getShipCoordinates(row, col) {\n    for (let i = 0; i < this.ships.length; i++) {\n      let ship = this.ships[i];\n      if (ship.coordinates.some(coordinate => coordinate[0] === row && coordinate[1] === col)) {\n        return i;\n      }\n    }\n    return -1;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/gameBoard.js?");

/***/ }),

/***/ "./src/classes/ship.js":
/*!*****************************!*\
  !*** ./src/classes/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Ship {\n  constructor(length) {\n    this.length = length;\n    this.hits = 0;\n    this.coordinates = [];\n    this.sunk = false;\n  }\n  hit() {\n    this.hits += 1;\n    if (this.hits >= this.length) this.sunk = true;\n  }\n  isSunk() {\n    return this.sunk;\n  }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);\n\n//# sourceURL=webpack://odin_battleship/./src/classes/ship.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/ship */ \"./src/classes/ship.js\");\n/* harmony import */ var _classes_gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes/gameBoard */ \"./src/classes/gameBoard.js\");\n\n\nconst board = new _classes_gameBoard__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nconst ship = new _classes_ship__WEBPACK_IMPORTED_MODULE_0__[\"default\"](5);\nboard.placeShips(ship, 0, 0, 'horizontal');\nboard.receiveAttack(0, 0);\nconsole.log(ship.hits);\n\n// board.receiveAttack(0, 0);\n\n//# sourceURL=webpack://odin_battleship/./src/index.js?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;