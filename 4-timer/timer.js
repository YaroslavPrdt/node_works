// let seconds = Number(process.argv['2'])>0 ? Number(process.argv['2']) : 0;
// let minutes = Number(process.argv['3'])>0 ? Number(process.argv['3'])  : 0;
// let hours = Number(process.argv['3'])>0 ? Number(process.argv['3']) : 0;

let time = process.argv['2'];

// let totlaTime = seconds * 1000 + minutes * 60000 + hours * 3600000;


let hours = time.match(/\d+/g)['0'];
let minutes = time.match(/\d+/g)['1'];
let seconds = time.match(/\d+/g)['2'];

let totlaTime = seconds * 1000 + minutes * 60000 + hours * 3600000;

setTimeout ( () => { 
    return console.log(`Прошло > ${hours} часов, > ${minutes} минут, > ${seconds} секунд`)
}, totlaTime );