import * as ActionTypes from '../actions/action'
import axios from 'axios'

const initialState = {
    loading: true,
    weather: {
        weatherTime: 0,
        weatherAlt: "img_none",
        weatherImage: "images/up-arrow.png",
        weatherDescription: "Cloudy with a chance of meatballs",
        weatherLocation: "43.6529,-79.3849",
        weatherTemperature: 0,
        weatherPrecipitationChance: "0%",
        weatherWind: "0 km/h"
    },
    defaultOptionStates: {
        work: false,
        news: false,
        games: false,
        socials: false,
        hobbies: false
    }
}

function getWeatherIcon(iconDescription){
    switch(iconDescription){
        case "clear-day":
            return "images/bag.png"
        default:
            return "images/bag.png"     
    }
}


export default function SettingsReducer(prevState=initialState, actionObj){
    switch(actionObj.type){
        case ActionTypes.GET_WEATHER:
            let newState = axios.get(`/weather/${actionObj.lat}/${actionObj.long}`) 
                .then(responseData => {
                    const newData = responseData.data
                    const newWeatherObj = {
                        weatherTime: newData.currently.time,
                        weatherAlt: "img_weather",
                        weatherImage: getWeatherIcon(newData.currently.icon),
                        weatherDescription: newData.currently.summary,
                        weatherLocation: newData.timezone,
                        weatherTemperature: newData.currently.temperature,
                        weatherPrecipitationChance: newData.currently.precipProbability,
                        weatherWind: newData.currently.windSpeed
                    }
                    let newWeatherState = Object.assign({}, prevState)
                    newWeatherState.weather = newWeatherObj
                    newWeatherState.loading = false
                    return newWeatherState
                })
                .catch(error => console.log("Client side - Error was: " + error.toString())) 
            return newState
        default:
            return prevState
    }
}