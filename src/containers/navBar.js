import React, { Component } from 'react'
import NavButton from "../components/navButton"
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'


class NavBar extends Component{

    render(){

    const addCollectionButton = (                   
        <li className="navButton" id="addCollectionNav">
            <button onClick={ () => this.props.displayAddCollection(!this.props.display) }>
                <img alt="img_add_collection" src={ this.props.display ? "images/minus.png" : "images/plus.png" }></img> 
            </button>
        </li> 
        )

        return(
            <span>
                <ol id="navButtonContainer">
                    { this.props.user ? <NavButton img="images/icons8-home-128.png" path="/"/> : null }
                    <NavButton img="images/icons8-settings-128.png" path="/account" />
                    { this.props.user ? addCollectionButton : null }
                </ol> 
            </span>
        )}
}

function mapStateToProps(state){
    return({
        user: state.userReducer.userLoggedIn,
        loading: state.userReducer.loading,
        weather: state.userReducer.weather,
        display: state.displayReducer.addCollectionDisplay
    })
}

function mapDispatchToProps(dispatch){
    return{
        fetchGetWeather: (lat, long) => dispatch(ActionTypes.fetchGetWeather(lat, long)),
        displayAddCollection: (boolean) => dispatch(ActionTypes.displayAddCollection(boolean))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

