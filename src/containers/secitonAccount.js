import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../components/login'
import Signup from '../components/signup'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'
import GoogleMaps from '../components/googlemaps'
import axios from 'axios'

class SectionAccount extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            lat: parseFloat(this.props.location.lat), 
            lng: parseFloat(this.props.location.lng)
        }
        this.handleLogout = this.handleLogout.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleCoordChange = this.handleCoordChange.bind(this)
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleCoordChange(coords){
        console.log(coords)
        this.setState({
            lat: coords.latLng.lat(),
            lng: coords.latLng.lng()
        })
    }

    handleSetLocation(){
        axios.post(`https://api.homebase.design/weather/${this.props.user}/${this.state.lat}/${this.state.lng}`)
        .then(response => {
            if(response.status === 200){
                const data = response.data.location
                this.props.fetchGetWeather(data)
                this.props.setLocation({lat: data.lat, lng: data.lng})
                localStorage.setItem('location', JSON.stringify(data.location))
            }
        }).catch(reason => {
            console.log(reason)
        })
    }

    handleLogout(){
        this.props.setUser(null, [], [])
        this.props.setUserCollections(null)
        this.props.setCollectionUrls(null)
        this.props.setLocation({lat: 43.65121272925317,lng: -79.40022880021183})
        localStorage.clear()
    }


    render(){
        if(this.props.user !== null) {
            return(
                <div id="settingsLoggedInBlock">
                    <div>
                        <h1 className="accountHeaders">Set your Location</h1>
                        <GoogleMaps coords={ {lat: this.state.lat, lng: this.state.lng} } coordChange={ this.handleCoordChange }/>
                        <input className="coordInput" type="text" name="lat" value={ this.state.lat } onChange={ this.handleChange } readOnly={ true }></input>
                        <input className="coordInput" type="text" name="lng" value={ this.state.lng } onChange={ this.handleChange } readOnly={ true }></input>
                        <button className="submitButtons" id="submitLocationButton" onClick={ () => this.handleSetLocation() }>Set Location</button>
                    </div>
                    <button className="accountHeaders" id="logoutButton" onClick={ this.handleLogout }>Log Out</button>
                </div>
            )
        } else {
            return(
                <div className="accountFlexboxes">
                    <div className="accountFlexbox">
                        <h1 className="accountHeaders">Login</h1>
                        <Route component={ Login } />
                    </div>
                    <div className="accountFlexbox">
                        <h1 className="accountHeaders">Create Account</h1>
                        <Route component={ Signup } />
                    </div>
                </div>
        )
    }
}
}

function mapStateToProps(state){
    return{
        user: state.userReducer.userLoggedIn,
        location: state.userReducer.location
    }
}

function mapDispatchToProps(dispatch){
    return{
        setUser: (username, location) => dispatch(ActionTypes.setUser(username, location)),
        setLocation: (location) => dispatch(ActionTypes.setLocation(location)),
        setUserCollections: (collections) => dispatch(ActionTypes.setUserCollections(collections)),
        setCollectionUrls: (urls) => dispatch(ActionTypes.setCollectionUrls(urls)),
        fetchGetWeather: (coords) => dispatch(ActionTypes.fetchGetWeather(coords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionAccount)