import * as ActionTypes from '../actions/action'

const initialState = {
    userLoggedIn: null,
    loading: true,
    weather: {},
    location: [],
    options:[
        {
            name: "Socials",
            urls: ["youtube.com", "instagram.com", "facebook.com"],
            imgSrc: "images/like.png"
        },
        {
            name: "News",
            urls: ["youtube.com", "nationalpost.com", "globeandmail.com"],
            imgSrc: "images/megaphone.png"
        },
        {
            name: "Work",
            urls: ["gmail.com", "hotmail.com", "duckduckgo.com"],
            imgSrc: "images/bag.png"
        },
        {
            name: "Interests",
            urls: ["kurzgesagt.com", "deviantart.com", "etsy.com"],
            imgSrc: "images/paintbrush.png"
        },
        {
            name: "Bills",
            urls: ["fido.ca", "enercare.com", "simplii.com", "pcfinancial.com"],
            imgSrc: "images/money.png"
        }
    ]
}

export default function SettingsReducer(prevState=initialState, actionObj){
    let newState = {...prevState}
    switch(actionObj.type){
        case ActionTypes.GET_WEATHER:
            console.log("Reducer returned: GET_WEATHER")
            newState.weather = actionObj.weather
            return newState
        case ActionTypes.SET_USER:
            console.log("Reducer returned: SET_USER")
            newState.userLoggedIn = actionObj.username
            newState.location = actionObj.location
            return newState
        case ActionTypes.SET_LOADING:
            console.log("Reducer returned: SET_LOADING")
            newState.loading = actionObj.bool
            return newState    
        default:
            console.log("Reducer returned: DEFAULT")
            return prevState
    }
}
