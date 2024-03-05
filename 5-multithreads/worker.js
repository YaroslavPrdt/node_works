const { parentPort, workerData } = require('worker_threads');
const remainder = require ('./remainder');

const computeRemainder = ({arr}) => {
    return remainder(arr);
}

parentPort.postMessage(computeRemainder(workerData))