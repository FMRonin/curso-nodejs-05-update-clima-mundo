const axios = require('axios');
require('dotenv').config()
const {SaveData, GetData} = require('../helpers/db-handler');

class Searcher{

    MAPBOX_INSTANCE = axios.create({
        baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
        params:
        {
            access_token:process.env.MAPBOX_KEY,
            limit:5,
            language:'es'
        }
      });
    
    OPENWEATHER_INSTANCE = axios.create({
        baseURL: 'https://api.openweathermap.org/data/2.5',
        params:
        {
            appid:process.env.OPEN_WEATHER_KEY,
            units:'metric',
            lang:'es'
        }
      });

    constructor() {
        this.historic = (GetData())?GetData():[]
    }

    get capitalizedHistoric(){
        return this.historic.toUpperCase()
    }

    async GetCity( query = ''){
        try {
            let res = await this.MAPBOX_INSTANCE.get(`/${query}.json`);
            let cities = res.data.features.map(city =>{
                return {
                    id:city.id,
                    name:city.place_name,
                    lat:city.center[1],
                    lon:city.center[0]
                }
            })
        return cities
        } catch (error) {
            return []
        }
    }

    async GetWeather(lat=0,lon=0){
        try {
            let res = await this.OPENWEATHER_INSTANCE.get('/weather',{params:{lat,lon}})
            let {weather, main} = res.data
            return {
                desc: weather[0].description,
                temp: main.temp,
                temp_max: main.temp_max,
                temp_min: main.temp_min
            }
        } catch (error) {
            console.log(error);
        }
    }

    async SetHistoric( place = ''){
        //Prevenir duplicado
        if (this.historic.includes(place.toLocaleLowerCase())) {
            
        }
         this.historic.unshift(place.toLocaleLowerCase())
         if (this.historic.length > 6) {
             this.historic.pop()
         }

         SaveData(this.historic)
         
    }

}

module.exports = Searcher