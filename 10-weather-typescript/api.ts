import express, { NextFunction, Request, Response } from 'express';
import { getForcast, saveCity, saveLanguage } from './weather.js';

const port = 8000;
const app = express();

app.get('/default-city', (req:Request, res:Response):void => {
    getForcast().then(result => {
        res.send(result);
    });
});

app.get('/custom-city', (req:Request, res:Response):void => {
    if(typeof req.query.city ==='string' ) {
        getForcast(req.query.city).then(result => {
            res.send(result);
        });
    }
});

app.get('/set-city', (req:Request, res:Response):void => {
    if(typeof req.query.city ==='string' ) {
        saveCity(req.query.city).then(result => {
            res.send(result);
        });
    }
});

app.get('/set-lang', (req:Request, res:Response):void => {
    if(typeof req.query.lang ==='string' ) {
        saveLanguage(req.query.lang).then(result => {
            res.send(result);
        });
    }
});

app.listen(port, ()=> {
    console.log(`Сервер запущен на http://localhost:${port}`)
});