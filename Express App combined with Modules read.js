const fs = require('fs');
const path = require('path');

function readFileContent() {
  const filePath = path.join(__dirname, 'Data.txt');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return data;
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
    return "Error: Unable to read Data.txt";
  }
}

module.exports = {
  readFileContent,
};
