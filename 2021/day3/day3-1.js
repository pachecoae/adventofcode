let gammaRate = 0;
let epsilonRate = 0;
const node = document.querySelectorAll('pre')[0];
const inputs = node.innerText.split('\n');

let mostCommonBits = {};
for (const input of inputs) {
  const bitChars = [...input];
  for (let i = 0; i < bitChars.length; i++) {
    const bit = parseInt(bitChars[i]);
    let mostCommonBit = mostCommonBits[i] ?? { 0: 0, 1: 0 };
    mostCommonBit[bit] += 1;
    mostCommonBits[i] = mostCommonBit;
  }
}

let gammaRateString = '';
let epsilonRateString = '';
Object.values(mostCommonBits).map((mostCommonBit) => {
  if (mostCommonBit[0] > mostCommonBit[1]) {
    gammaRateString += '0';
    epsilonRateString += '1';
  } else {
    gammaRateString += '1';
    epsilonRateString += '0';
  }
});

gammaRate = parseInt(gammaRateString, 2);
epsilonRate = parseInt(epsilonRateString, 2);
const answer = gammaRate * epsilonRate;

console.table({ answer });
