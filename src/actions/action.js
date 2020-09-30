import axios from 'axios'

export const GET_WEATHER = "action/getWeather"
export const SET_USER = "action/setUser"
export const SET_LOCATION = "action/setLocation"
export const SET_USER_COLLECTIONS ="action/setUserCollections"
export const SET_COLLECTION_URLS = "action/setCollectionUrls"
export const SET_LOADING = "action/setLoading"
export const FETCH_GETWEATHER = "action/fetchGetWeather"
export const ADD_URL = "action/addUrl"
export const MINUS_URL = "action/minusUrl"
export const DISPLAY_ADD_COLLECTION = "action/displayAddCollection"

export const getWeather = (weather) => {
    return {
        type: GET_WEATHER,
        weather
    }
}

export const fetchGetWeather = (coords) => {
    return (dispatch) => {
    axios.get(`/weather/${coords.lat}/${coords.lng}`)
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

export const addUrl = (url, name, index) => {
    return{
        type: ADD_URL,
        url,
        name,
        index
    }
}

export const minusUrl = (url, name, index) => {
    return{
        type: MINUS_URL,
        url,
        name,
        index
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        loading
    }
}
    

export const setUser = (username, location, bool) => {
    console.log(location)
    return{
        type: SET_USER,
        username,
        location,
        bool
    }
}

export const setLocation = (location) => {
    return{
        type: SET_LOCATION,
        location
    }
}

export const setUserCollections = (newCollections) => {
    return{
        type: SET_USER_COLLECTIONS,
        newCollections
    }
}

export const setCollectionUrls = (urls) => {
    return{
        type: SET_COLLECTION_URLS,
        urls
    }
}

export const displayAddCollection = (boolean) => {
    return{
        type: DISPLAY_ADD_COLLECTION,
        boolean
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