const { multiply,sum } = require('./make_operations.js');

const operations = {
    multiply,
    sum,
};

const [ , , num1, num2, operation_request] = process.argv;

Object.keys(operations).includes(operation_request) ?
console.log(operations[operation_request](Number(num1), Number(num2))):
console.log(`Try command ${ Object.keys(operations).join(', ') }`);



