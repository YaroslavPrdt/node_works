const { firstNum, secondNum } = require('./add.js');
let operation_request = process.argv['4'];

sum = operation_request === 'sum' ? firstNum + secondNum : 'try sum command';

module.exports = { sum }