export const GET_WEATHER = "action/getWeather"

export const getWeather = (lat, long) => {
    return{
        type: GET_WEATHER,
        lat,
        long
    }
}