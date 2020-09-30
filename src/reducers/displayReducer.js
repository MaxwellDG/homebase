import * as ActionTypes from '../actions/action'

const displayState = {
    addCollectionDisplay: false
}

export default function DisplayReducer(prevState=displayState, actionObj){
    let newState = {...prevState}
    switch(actionObj.type){
        case ActionTypes.DISPLAY_ADD_COLLECTION:
            newState.addCollectionDisplay = actionObj.boolean
            return newState
        default:
            return newState    
    }
}