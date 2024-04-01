import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(`${chalk.bgRed('Error:')} ${error}`)
}

const printSuccess = (message) => {
    console.log(`${chalk.bgGreen ('Success:')} ${message}`)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan('Help:')}
        Без параметров вывод погоды невозможен
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для устангвки токена
    `)
}

const printWeather = (res, icon, language) => {
    if (language === 'ru') {
        console.log(dedent`
        ${chalk.bgYellow('WEATHER')}
        Погода в городе ${res.name}
        ${icon} ${res.weather[0].description.toUpperCase()},
        Температура: ${res.main.temp}°,
        Ощущается: ${res.main.feels_like}°,
        Влажность: ${res.main.humidity}%,
        Скорость ветра: ${res.wind.speed} м/с.
        `);
    } else if (language === 'en') {
        console.log(dedent`
        ${chalk.bgYellow('WEATHER')}
        Weather in the ${res.name}
        ${icon} ${res.weather[0].description.toUpperCase()},
        Temperature: ${res.main.temp}°,
        Feels like: ${res.main.feels_like}°,
        Humidity: ${res.main.humidity}%,
        Wind speed: ${res.wind.speed} m/s.
        `);
    }

}

export {printError, printSuccess, printHelp, printWeather}