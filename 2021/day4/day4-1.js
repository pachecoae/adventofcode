function buildBoards(inputs) {
  let boards = [];
  let board = [];
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const spaces = input
      .split(' ')
      .filter((s) => !!s.length)
      .map((s) => {
        return { value: s, drawn: false };
      });
    board.push(spaces);
    if (i % 5 === 4) {
      boards.push(board);
      board = [];
    }
  }
  return boards;
}

const updateBoards = (drawnNumber, boards) => {
  for (const board of boards) {
    for (const row of board) {
      for (const cell of row) {
        if (cell.value === drawnNumber) {
          cell.drawn = true;
        }
      }
    }
  }
};

const sumBoard = (board) => {
  return board
    .flatMap((rows) => rows)
    .reduce((sum, num) => sum + parseInt(num.drawn ? 0 : num.value), 0);
};

const rowWon = (row) => {
  return !row.some((cell) => !cell.drawn);
};

const colWon = (board, colIndex) => {
  return !board.map((row) => row[colIndex]).some((cell) => !cell.drawn);
};

const boardWon = (board) => {
  for (const row of board) {
    if (rowWon(row)) {
      return true;
    }
  }

  for (let k = 0; k < board[0].length; k++) {
    if (colWon(board, k)) {
      return true;
    }
  }

  return false;
};

const getAnswer = (numbers, boards) => {
  for (const drawnNumber of numbers) {
    updateBoards(drawnNumber, boards);
    for (const board of boards) {
      if (boardWon(board)) {
        const sum = sumBoard(board);
        return sum * parseInt(drawnNumber);
      }
    }
  }
};

const node = document.querySelectorAll('pre')[0];
let inputs = node.innerText.split('\n');
const numbers = inputs[0].split(',');

inputs.splice(0, 2);
inputs = inputs.filter((input) => input.length);
const boards = buildBoards(inputs);

const answer = getAnswer(numbers, boards);
console.table({ answer });
