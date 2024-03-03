const time = process.argv['2'];
const matchedTime = time.match(/(\d+)(s|m|h)/g);

const totalTimeInSeconds = matchedTime.reduce((sum, item)=>{
    return sum + (
            (item.match(/h/g)) && (Number(item.match(/\d+/g)[0])*60*60)||
            (item.match(/m/g)) && (Number(item.match(/\d+/g)[0])*60)||
            (item.match(/s/g)) && (Number(item.match(/\d+/g)[0]))
           )
}, 0);

const startTime = new Date().toLocaleTimeString('ru');
const timeLeft = new Date(totalTimeInSeconds * 1000).toISOString().substring(11, 19);

setTimeout ( () => { 
    return console.log(`Время запуска таймера: ${startTime}; Таймер отсчитал: ${timeLeft}`)
}, totalTimeInSeconds*1000 );