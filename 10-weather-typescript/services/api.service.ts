import axios from 'axios';

type iconSymbol = {
    [key: string]: string
}

const getIcon = (icon:string):string => {
     let iconItem:iconSymbol = {
        '01':'🔆',
        '02':'🌤️',
        '03':'🌥',
        '04':'☁️',
        '09':'🌧️',
        '10':'🌦️',
        '11':'🌩',
        '13':'🌨',
        '50':'🌫',
    };
    return iconItem[icon.slice(0, -1)];
}

const getWeather = async (token:string, city:string, language:string) => {
    if (!token) {
        if (language === 'ru') {
            throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]')
        }
        if (language === 'en') {
            throw new Error('The API key is not set, set it using the command -t [API_KEY]')
        }
    }

    const { data } = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
            q: city,
            appid: token,
            lang: language,
            units: 'metric'
        }
    });
    return data;
}

export { getWeather, getIcon }