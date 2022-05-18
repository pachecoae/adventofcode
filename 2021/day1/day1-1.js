const input = '';
const node = document.querySelectorAll('pre')[0];
const splitText = node.innerText.split('\n');
let increaseCount = 0;
let lastNum = null;
splitText.forEach((text) => {
  const num = parseInt(text);
  if (lastNum && num > lastNum) {
    increaseCount++;
  }
  lastNum = num;
});

console.table({
  answer: increaseCount,
});
