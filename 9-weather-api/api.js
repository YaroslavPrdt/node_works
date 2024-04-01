import express from 'express';
import { getForcast, saveCity, saveLanguage } from './weather.js';

const port = 8000;
const app = express();

app.get('/default-city', (req, res) => {
    getForcast().then(result => {
        res.send(result);
    });
});

app.get('/custom-city', (req, res) => {
    getForcast(req.query.city).then(result => {
        res.send(result);
    });
});

app.get('/set-city', (req, res) => {
    saveCity(req.query.city).then(result => {
        res.send(result);
    });
});

app.get('/set-lang', (req, res) => {
    saveLanguage(req.query.lang).then(result => {
        res.send(result);
    });
});

app.listen(port, ()=> {
    console.log(`Сервер запущен на http://localhost:${port}`)
});