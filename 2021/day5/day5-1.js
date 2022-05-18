function buildEmptyDiagram(maxX, maxY) {
  let diagram = [];
  for (let i = 0; i < maxY; i++) {
    let row = [];
    for (let j = 0; j < maxX; j++) {
      row.push(0);
    }
    diagram.push(row);
  }
  return diagram;
}

function drawHorizontalLine(y, x1, x2, diagram) {
  const row = diagram[y];
  for (let i = x1; i <= x2; i++) {
    row[i] += 1;
  }
}

function drawVerticalLine(x, y1, y2, diagram) {
  for (let i = y1; i <= y2; i++) {
    const row = diagram[i];
    row[x] += 1;
  }
}

function drawLine(diagram, ventLine) {
  let { x1, y1, x2, y2 } = ventLine;
  if (x1 > x2) {
    const copy = x1;
    x1 = x2;
    x2 = copy;
  }

  if (y1 > y2) {
    const copy = y1;
    y1 = y2;
    y2 = copy;
  }

  if (y1 === y2) {
    drawHorizontalLine(y1, x1, x2, diagram);
  }

  if (x1 === x2) {
    drawVerticalLine(x1, y1, y2, diagram);
  }
}

function drawDiagram(diagram, ventLines) {
  for (const ventLine of ventLines) {
    drawLine(diagram, ventLine);
  }
}

function findNumDangerousPoints(diagram) {
  let num = 0;
  for (let i = 0; i < diagram.length; i++) {
    const row = diagram[i];
    for (let j = 0; j < row.length; j++) {
      if (row[j] >= 2) {
        num++;
      }
    }
  }
  return num;
}

const node = document.querySelectorAll('pre')[0];
let inputs = node.innerText.split('\n');

const ventLines = inputs
  .map((input) => input.split(' -> '))
  .map((input) => {
    // const coordinate1 = input[0].split(',');
    // const coordinate2 = input[1].split(',');
    // return {
    //   x1: coordinate1[0],
    //   y1: coordinate1[1],
    //   x2: coordinate2[0],
    //   y2: coordinate2[1],
    // };
  });

let diagram = buildEmptyDiagram(1000, 1000);
drawDiagram(diagram, ventLines);

const answer = findNumDangerousPoints(diagram);
console.table({ answer });
