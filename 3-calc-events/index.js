const EventEmmiter = require('events');

const myEmmiter = new EventEmmiter();

const { multiply } = require('./multiply.js');
const { sum } = require('./sum.js');

let operation_request = process.argv['4'];

myEmmiter.on(operation_request, ()=> {

    operation_request === 'multiply' && console.log(multiply);
    operation_request === 'sum' && console.log(sum);

})

operation_request === 'multiply' || operation_request === 'sum' ?
myEmmiter.emit(operation_request):
console.log(`try 'sum' or 'multiply' command`);