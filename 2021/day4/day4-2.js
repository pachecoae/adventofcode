function buildBoards(inputs) {
  let boards = [];
  let board = { data: [], won: false };
  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const spaces = input
      .split(' ')
      .filter((s) => !!s.length)
      .map((s) => {
        return { value: s, drawn: false };
      });
    board.data.push(spaces);
    if (i % 5 === 4) {
      boards.push(board);
      board = { data: [], won: false };
    }
  }
  return boards;
}

const updateBoards = (drawnNumber, boards) => {
  for (const board of boards) {
    for (const row of board.data) {
      for (const cell of row) {
        if (cell.value === drawnNumber) {
          cell.drawn = true;
        }
      }
    }
  }
};

const sumBoard = (board) => {
  return board.data
    .flatMap((rows) => rows)
    .reduce((sum, num) => sum + parseInt(num.drawn ? 0 : num.value), 0);
};

const rowWon = (row) => {
  return !row.some((cell) => !cell.drawn);
};

const colWon = (board, colIndex) => {
  return !board.data.map((row) => row[colIndex]).some((cell) => !cell.drawn);
};

const boardWon = (board) => {
  for (const row of board.data) {
    if (rowWon(row)) {
      return true;
    }
  }

  for (let k = 0; k < board.data[0].length; k++) {
    if (colWon(board, k)) {
      return true;
    }
  }

  return false;
};

const winningBoardDatum = [];
const getAnswer = (numbers, boards) => {
  for (const drawnNumber of numbers) {
    const losingBoards = boards.filter((board) => !board.won);
    updateBoards(drawnNumber, losingBoards);
    for (const board of losingBoards) {
      if (boardWon(board)) {
        board.won = true;
        const winningBoardData = {
          board,
          drawnNumber,
        };
        winningBoardDatum.push(winningBoardData);
      }
    }
  }

  const { board, drawnNumber } = winningBoardDatum[winningBoardDatum.length - 1];
  const sum = sumBoard(board);
  console.table({ drawnNumber, sum });
  return sum * parseInt(drawnNumber);
};

const node = document.querySelectorAll('pre')[0];
let inputs = node.innerText.split('\n');
// let inputs = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
// 8  2 23  4 24
// 21  9 14 16  7
// 6 10  3 18  5
// 1 12 20 15 19

// 3 15  0  2 22
// 9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
// 2  0 12  3  7
// `.split('\n');
const numbers = inputs[0].split(',');

inputs.splice(0, 2);
inputs = inputs.filter((input) => input.length);
const boards = buildBoards(inputs);

const answer = getAnswer(numbers, boards);
console.table({ answer });
