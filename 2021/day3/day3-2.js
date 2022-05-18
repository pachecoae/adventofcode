const findCommonBits = (inputs) => {
  let bitCounts = {};
  for (const input of inputs) {
    const bitChars = [...input];
    for (let i = 0; i < bitChars.length; i++) {
      const bit = parseInt(bitChars[i]);
      let bitCount = bitCounts[i] ?? { 0: 0, 1: 0 };
      bitCount[bit] += 1;
      bitCounts[i] = bitCount;
    }
  }

  const mostCommonBits = [];
  const leastCommonBits = [];
  Object.values(bitCounts).forEach((bitCount) => {
    mostCommonBits.push(bitCount[1] >= bitCount[0] ? 1 : 0);
    leastCommonBits.push(bitCount[0] <= bitCount[1] ? 0 : 1);
  });

  return {
    mostCommonBits,
    leastCommonBits,
  };
};

const filterInputs = (inputs, isMostCommon) => {
  let i = 0;

  while (inputs.length > 1 && i < 12) {
    const commonBits = findCommonBits(inputs);
    const { mostCommonBits, leastCommonBits } = commonBits;
    const bits = isMostCommon ? mostCommonBits : leastCommonBits;
    inputs = inputs.filter((input) => {
      const bitChars = [...input];
      return bits[i] === parseInt(bitChars[i]);
    });

    i++;
  }

  return inputs[0];
};

const node = document.querySelectorAll('pre')[0];
const inputs = node.innerText.split('\n');

const binaryOxygenRating = filterInputs([...inputs], true);
const binaryCo2Rating = filterInputs([...inputs], false);

const oxygenRating = parseInt(binaryOxygenRating, 2);
const co2Rating = parseInt(binaryCo2Rating, 2);
const answer = oxygenRating * co2Rating;

console.table({
  answer,
});
