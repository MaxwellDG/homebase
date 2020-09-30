import * as ActionTypes from '../actions/action'

/* Urls are separated into their own Reducer for ease of triggering rerendering of Redux's shallow comparison */
/* Note that this makes the Redux data structuring different from the MongoDB data structuring */

let storageUrls = JSON.parse(localStorage.getItem("urls"))

const urlsState =  storageUrls ? storageUrls : null

export default function UrlsReducer(prevState= urlsState, actionObj){
    let newState = Object.assign({}, prevState)
    switch(actionObj.type){
        case ActionTypes.SET_COLLECTION_URLS:
            newState = actionObj.urls
            return newState
        case ActionTypes.ADD_URL:
            newState[actionObj.name].urls.push(actionObj.url)
            return newState
        case ActionTypes.MINUS_URL:
            newState[actionObj.name].urls.splice(newState[actionObj.name].urls.indexOf(actionObj.url), 1)
            return newState
        default:
            return prevState    
    }
}