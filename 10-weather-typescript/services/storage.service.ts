import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath:string = join(homedir(), 'weather-data.json');

interface Tokens {
    token: string,
    city: string,
    language: string,
}

const TOKEN_DICTIONARY:Tokens = {
    token: 'token',
    city: 'city',
    language: 'language',
}

const saveKeyValue = async (key:string, value:string) => {
   let data:any = {};
   if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file.toString());
   }
   data[key] = value;
   await promises.writeFile(filePath, JSON.stringify(data))
};

const getKeyValue = async (key:string) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file.toString());
        return data[key];
    }
    return undefined;
}

const isExist = async (path:string) => {
    try {
        await promises.stat(path)
        return true;
    } catch (e) {
        return false;
    }
}

export {saveKeyValue, getKeyValue, TOKEN_DICTIONARY};