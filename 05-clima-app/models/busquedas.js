const fs = require('fs');
const axios = require('axios');


class Busqueda {

    historial = [];
    dbPath = './db/database.json';

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {
        return this.historial.map(lugar => {
            let palabras = lugar.split(' ');

            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));
            
            return palabras.join(' ');
        });
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            lang: 'es',
            units: 'metric',
            appid: process.env.OPENWEATHER_KEY
        }
    }

    async ciudad(lugar = '') {
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            // const {data: response} = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/c.json?access_token=pk.eyJ1IjoiZ3BlcmV6OTkxIiwiYSI6ImNrcW9tY2NtZDByYmsycG10bWVrbGU0b24ifQ.2vY9Sy0sKGM8-evZlzpHZA&limit=5&language=es');

            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
                
            }));
        } catch (error) {   
            return [];
        }
    }

    async clima(lat, lon) {
        try {    
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsOpenWeather, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                descripcion: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLowerCase())) {
            return;
        }

        this.historial = this.historial.splice(0,5);

        this.historial.unshift(lugar);
        this.guardarDB();
    }

    guardarDB() {
        const payload = {
            historial: this.historial,
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return null;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);

        this.historial = data.historial;
    }
}

module.exports = Busqueda;
