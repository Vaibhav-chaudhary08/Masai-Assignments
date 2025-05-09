const boxen = require('boxen');

const message = "I am using my first external module!";
const title = "Hurray!!!";

const classicBox = {
  title: title,
  padding: 1,
};

const singleDoubleBox = {
  title: title,
  borderStyle: 'singleDouble',
  padding: 1,
};

const roundBox = {
  title: title,
  borderStyle: 'round',
  padding: 1,
};

const coloredBox = {
  title: title,
  padding: 1,
  backgroundColor: 'cyan',
  titleAlignment: 'center'
};

console.log(boxen(message, classicBox));
console.log(boxen(message, singleDoubleBox));
console.log(boxen(message, roundBox));
console.log(boxen(message, coloredBox));
