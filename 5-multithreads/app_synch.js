const remainder = require ('./remainder')
const { performance } = require('perf_hooks');

let array = [];
for (i = 1; i <= 3000000; i++) {
    array.push(i);
}

const computeRemainder = (arr) => {
    return remainder(arr);
}


const synch = () => {
    performance.mark('start');
    computeRemainder(array);
    performance.mark('end');
    performance.measure('time_is', 'start', 'end');

    console.log(computeRemainder(array));
    console.log(performance.getEntriesByName('time_is').pop());
}

synch();