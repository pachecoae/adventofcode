const input = '';
const node = document.querySelectorAll('pre')[0];
const splitText = node.innerText.split('\n');

const splitSplitText = splitText.map((text) => text.split(' '));

let hPos = 0;
let vPos = 0;

splitSplitText.forEach((pair) => {
  const dir = pair[0];
  const val = pair[1];
  switch (dir) {
    case 'forward':
      hPos += parseInt(val);
      break;
    case 'up':
      vPos -= parseInt(val);
      break;
    case 'down':
      vPos += parseInt(val);
      break;
  }
});

console.table({ hPos, vPos, answer: hPos * vPos });
