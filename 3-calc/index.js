const { multiply,sum } = require('./make_operations.js');

const operations = {
    multiply,
    sum,
};

const [ , , num1, num2, operation_request] = process.argv;
console.log(operations[operation_request](num1, num2));