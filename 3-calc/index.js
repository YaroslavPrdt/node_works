const { multiply } = require('./multiply.js');
const { sum } = require('./sum.js');

let operation_request = process.argv['4'];

switch (operation_request) {
    case 'multiply':
        console.log(multiply);
        break;
    case 'sum':
        console.log(sum);
        break;
    default:
        console.log(`try 'sum' or 'multiply' command`);
}

// operation_request === 'multiply' && console.log(multiply);
// operation_request === 'sum' && console.log(sum);