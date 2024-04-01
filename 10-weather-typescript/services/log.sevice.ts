import dedent from 'dedent-js';

const printError = (error:string) => {
    return(`Error: ${error}`);
}

const printSuccess = (message:string) => {
    return(`Success: ${message}`);
}

const printHelp = () => {
    return(
        dedent`Help:
        Без параметров вывод погоды невозможен
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для устангвки токена
    `)
}

const printWeather = (res:any, icon:string, language:string) => {
    if (language === 'ru') {
        return(dedent`
        Погода в городе ${res.name}
        ${icon} ${res.weather[0].description.toUpperCase()},
        Температура: ${res.main.temp}°,
        Ощущается: ${res.main.feels_like}°,
        Влажность: ${res.main.humidity}%,
        Скорость ветра: ${res.wind.speed} м/с.
        `);
    } else if (language === 'en') {
        return(dedent`
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