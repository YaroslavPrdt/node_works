const remainder = require ('./remainder')
const { performance } = require('perf_hooks');
const { Worker } = require('worker_threads');
const os = require('os');
const numberOfCPUCores = os.cpus().length;
const ITERATIONS = 3_000_000;

const createNewArray = (iterations) => {
    return [...Array(iterations)].map((_, i) => i+1);
}

const countCpuCoresArray = (array, divider) => {
    const chunkSize = array.length/divider;
    const resultArray = [];
    for ( let i = 0; i < array.length; i += chunkSize ) {
        resultArray.push(array.slice(i, i + chunkSize));
    }
    return resultArray;
}

const cumulativeArray = createNewArray(ITERATIONS);
const splitedArray = countCpuCoresArray(cumulativeArray, numberOfCPUCores);

const synch = (array) => {
    performance.mark('start');
    remainder(array);
    performance.mark('end');
    performance.measure('time_is', 'start', 'end');
    console.log(remainder(array));
    console.log(performance.getEntriesByName('time_is').pop());
}

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

const asynch = async (splitedArray) => {
    performance.mark('start');
    const result = await Promise.all(splitedArray.map( (arr)=>{
        return computeRemainder(arr)
    } ));
    console.log(result);
    performance.mark('end');
    performance.measure('time_is', 'start', 'end');

    console.log(performance.getEntriesByName('time_is').pop());
}

synch(cumulativeArray);
asynch(splitedArray);