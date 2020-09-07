class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  getCell(row, col) {
    if (this.board[row][col]) {
      return this.board[row][col];
    } else {
      return "dead";
    }
  }

  setCell(val, row, col) {
    if (this.board[row][col]) {
      this.board[row][col] = val;
      return this.board[row][col];
    } else {
      return "dead";
    }
  }

  toggleCell(row, col) {
    if (this.board[row][col]) {
      if (this.board[row][col] === 1) {
        this.board[row][col] = 2;
      } else {
        this.board[row][col] = 1;
      }
      return this.board[row][col];
    } else {
      return "dead";
    }
  }

  makeBoard() {
    let i = 0;
    let j = 0;
    let row = [];
    let newBoard = [];
    while (i < this.width) {
      row.push(1);
      i++;
    }

    while (j < this.height) {
      newBoard.push(row);
      j++;
    }
    this.board = newBoard;
    return this.board;
  }

  livingNeighbors(row, col) {
    // TODO: Return the count of living neighbors.
  }

  /**
   * Given the present board, apply the rules to generate a new board
   */

  tick() {
    const newBoard = this.makeBoard();
    // TODO: Here is where you want to loop through all the cells
    // on the existing board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the new board
    // (the next iteration of the game)
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells in newBoard,
    // based on their current alive neighbors
    this.board = newBoard;
  }
}
