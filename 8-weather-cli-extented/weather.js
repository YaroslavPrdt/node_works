#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printError, printSuccess, printWeather } from './services/log.sevice.js'
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async(token) => {
    if(!token.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const saveLanguage = async(language) => {
    if(!language.length) {
        printError('Не передан токен');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.language, language);
        if (language === 'ru') {
            printSuccess('Язык сохранён');
        } else if (language === 'en') {
            printSuccess('Language saved');
        }
    } catch (e) {
        printError(e.message);
    }
}

const saveCity = async(city) => {
    if(!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const getForcast = async() => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const cities = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    const language = process.env.LANGUAGE ?? await getKeyValue(TOKEN_DICTIONARY.language);

    cities.forEach(async city => {
        try {
            const weather = await getWeather(token, city, language);
            printWeather(weather, getIcon(weather.weather[0].icon), language);
        } catch (e) {
            if (e?.response?.status == 404) {
                printError('Неверно указан город')
            } else if (e?.response?.status == 401) {
                printError('Неверно указан TOKEN')
            } else {
                printError(e.message)
            }
        }
    });
}

const initCli = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    if (args.l) {
        return saveLanguage(args.l);
    }
    return getForcast();
}

initCli();