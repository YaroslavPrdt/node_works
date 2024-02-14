const { multiply } = require('./multiply.js');
const { sum } = require('./sum.js');

let operation_request = process.argv['4'];

operation_request === 'multiply' && console.log(multiply);
operation_request === 'sum' && console.log(sum);