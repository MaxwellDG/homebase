import * as ActionTypes from '../actions/action'

/* Note that the 'urls' properties (once the object is initialized) are never utilized
   They are present simply because of the MongoDB schema model required them by default
   All 'urls' manipulation is instead done in the urlsReducer */

let storageCollections = JSON.parse(localStorage.getItem("collections"))

const collectionsState = storageCollections ? storageCollections : null

export default function CollectionsReducer(prevState=collectionsState, actionObj){
    let newState = Object.assign({}, prevState)
    switch(actionObj.type){
        case ActionTypes.SET_USER_COLLECTIONS:
            newState = actionObj.newCollections
            return newState   
        default:
            return prevState
    }
}

