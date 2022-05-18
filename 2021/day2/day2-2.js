const input = '';
const node = document.querySelectorAll('pre')[0];
const splitText = node.innerText.split('\n');

const splitSplitText = splitText.map((text) => text.split(' '));

let aim = 0;
let hPos = 0;
let vPos = 0;

splitSplitText.forEach((pair) => {
  const dir = pair[0];
  const val = pair[1];
  const numVal = parseInt(val);
  switch (dir) {
    case 'forward':
      hPos += numVal;
      vPos += aim * numVal;
      break;
    case 'up':
      aim -= numVal;
      break;
    case 'down':
      aim += numVal;
      break;
  }
});

console.table({ hPos, vPos, answer: hPos * vPos });
