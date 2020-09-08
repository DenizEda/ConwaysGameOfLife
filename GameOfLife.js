class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.makeBoard();
  }

  makeBoard() {
    const myBoard = new Array(this.height).fill(0);
    return myBoard.map(() => {
      const cell = new Array(this.width).fill(0);
      return cell;
    });
  }

  cellExists(row, col) {
    if (row >= 0 && row < this.height && col >= 0 && col < this.width) {
      return true;
    } else {
      return false;
    }
  }

  getCell(row, col) {
    if (this.cellExists(row, col)) {
      return this.board[row][col];
    } else {
      return 0;
    }
  }

  setCell(value, row, col) {
    if (this.cellExists(row, col)) {
      this.board[row][col] = value;
    } else {
      return 0;
    }
  }

  toggleCell(row, col) {
    if (this.cellExists(row, col)) {
      if (this.board[row][col] === 1) {
        this.setCell(0, row, col);
      } else if (this.board[row][col] === 0) {
        this.setCell(1, row, col);
      }
    } else {
      return;
    }
  }

  livingNeighbors(row, col) {
    return (
      this.getCell(row - 1, col - 1) +
      this.getCell(row - 1, col) +
      this.getCell(row - 1, col + 1) +
      this.getCell(row, col - 1) +
      this.getCell(row, col + 1) +
      this.getCell(row + 1, col - 1) +
      this.getCell(row + 1, col) +
      this.getCell(row + 1, col + 1)
    );
  }

  conwayRule(cell, livingNeighbors) {
    const isAlive = cell === 1;
    if (isAlive) {
      if (livingNeighbors === 2 || livingNeighbors === 3) {
        return 1;
      } else {
        return 0;
      }
    } else if (livingNeighbors === 3) {
      return 1;
    } else {
      return 0;
    }
  }

  forEachCell(iterator) {
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        iterator(row, col);
      }
    }
  }

  tick() {
    const newBoard = this.makeBoard();
    this.forEachCell((row, col) => {
      const livingNeighbors = this.livingNeighbors(row, col);
      const nextCell = this.conwayRule(this.getCell(row, col), livingNeighbors);
      newBoard[row][col] = nextCell;
    });
    this.board = newBoard;
  }
}
