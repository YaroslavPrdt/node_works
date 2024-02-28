const remainder = require ('./remainder');
const { Worker } = require('worker_threads');
const { performance } = require('perf_hooks');

let arr = [];
for (i = 1; i <= 3000000; i++) {
    arr.push(i);
}

let arr1 = arr.slice(0, arr.length / 2);
let arr2 = arr.slice(arr.length / 2, arr.length);

const computeRemainder = (arr) => {
    return new Promise( (resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                arr
            }
        });
        worker.on('message', (msg) => {
            resolve(msg);
        });
        worker.on('error', (err)=> {
            reject(err);
        });
        worker.on('exit', () => {
            console.log('Завершено')
        });
    } );
}


const asynch = async () => {
    performance.mark('start');
    const result = await Promise.all([
        computeRemainder(arr1),
        computeRemainder(arr2),
    ]);
    // я не понял, надо ли складывать результат?
    console.log(result);
    performance.mark('end');
    performance.measure('time_is', 'start', 'end');

    console.log(performance.getEntriesByName('time_is').pop());
}

asynch();