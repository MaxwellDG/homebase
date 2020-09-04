import axios from 'axios'

export const GET_WEATHER = "action/getWeather"
export const SET_USER = "action/setUser"
export const SET_LOADING = "action/setLoading"
export const FETCH_GETWEATHER = "action/fetchGetWeather"

export const getWeather = (weather) => {
    return {
        type: GET_WEATHER,
        weather
    }
}

export const fetchGetWeather = (lat, long) => {
    return (dispatch) => {
    axios.get(`/weather/${lat}/${long}`)
         .then(response => {
            const data = response.data
            const weatherObj = {
                weatherTime: data.currently.time,
                weatherAlt: "img_weather",
                weatherImage: getWeatherIcon(data.currently.icon),
                weatherDescription: data.currently.summary,
                weatherLocation: data.timezone,
                weatherTemperature: data.currently.temperature,
                weatherPrecipitationChance: data.currently.precipProbability,
                weatherWind: data.currently.windSpeed
            }
            dispatch(getWeather(weatherObj))
         }).catch((error) => {
             console.log(error)
         })
    dispatch(setLoading(false))
    }    
}

export const setLoading = (bool) => {
    return {
        type: SET_LOADING,
        bool
    }
}
    

export const setUser = (username, location) => {
    return{
        type: SET_USER,
        username,
        location
    }
}


function getWeatherIcon(iconDescription){
    switch(iconDescription){
        case "clear-day":
            return "images/033-sun.png"
        case "clear-night":
            return "images/019-moon.png"
        case "partly-cloudy-day":
            return "images/046-cloudy.png"
        case "partly-cloudy-night":
            return "images/020-night.png"
        case "rain":
            return "images/005-rain.png"
        case "sleet":
            return "images/017-sleet.png"
        case "snow":
            return "images/011-snow.png"
        case "wind":
            return "images/024-wind.png"
        case "fog":
            return "images/037-foggy.png"            
        default:
            return "images/046-cloudy.png"     
    }
}