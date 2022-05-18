const input = '';
const node = document.querySelectorAll('pre')[0];
const splitText = node.innerText.split('\n');
let slidingWindow = [-1, 0, 1];

const incrementSlidingWindow = (slidingWindow) => {
  slidingWindow[0] = slidingWindow[0] + 1;
  slidingWindow[1] = slidingWindow[1] + 1;
  slidingWindow[2] = slidingWindow[2] + 1;
};

const valueToSum = {};

splitText.forEach((text) => {
  const num = parseInt(text);

  slidingWindow.forEach((value) => {
    let sum = valueToSum[value] ?? 0;
    sum += num;
    valueToSum[value] = sum;
  });

  incrementSlidingWindow(slidingWindow);
});

let lastNum = null;
let increaseCount = 0;
Object.values(valueToSum)
  .filter((value) => value >= 1)
  .forEach((num) => {
    if (lastNum && num > lastNum) {
      increaseCount++;
    }
    lastNum = num;
  });

console.table({
  valueToSum,
  increaseCount,
});
