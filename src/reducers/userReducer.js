import * as ActionTypes from '../actions/action'

console.log(JSON.parse(localStorage.getItem('location')))

let storageLocation = JSON.parse(localStorage.getItem('location'))

const userState = {
    userLoggedIn: localStorage.getItem('user'),
    password: localStorage.getItem('password'),
    weather: {},
    location: storageLocation ? storageLocation : {
        lat: 43.65121272925317,
        lng: -79.40022880021183
    }
}

export default function UserReducer(prevState=userState, actionObj){
    let newState = Object.assign({}, prevState)
    switch(actionObj.type){
        case ActionTypes.GET_WEATHER:
            newState.weather = actionObj.weather
            return newState
        case ActionTypes.SET_USER:
            newState.userLoggedIn = actionObj.username
            newState.location = actionObj.location
            newState.loggedIn = actionObj.bool
            return newState
        case ActionTypes.SET_LOADING:
            newState.loading = actionObj.bool
            return newState
        case ActionTypes.SET_LOCATION:
            newState.location.lat = actionObj.location.lat
            newState.location.lng = actionObj.location.lng
            return newState
        default:
            return prevState
        }
}    