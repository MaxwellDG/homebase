import React from 'react'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class WeatherContainer extends React.Component{

    componentDidMount(){
        this.props.getWeather("43.6532", "-79.3832") 
    }

    render(){
        const { weather, loading } = this.props

        if(loading){
            return(
                <div id="weatherContainer">
                    <image alt={ weather.weatherAlt } src={ weather.weatherImage }></image> 
                    <p>{ weather.weatherDescription }</p>
                    <p>{ weather.weatherLocation }</p>
                    <p>{ weather.weatherTemperature }</p>
                    <p>{ weather.weatherPrecipitationChance }</p>
                    <p>{ weather.weatherWind }</p>
                </div>
            )
        } else {
            return(
                <div></div>
            )
        }
    }
}

function mapStateToProps(state){
    console.log(state)
    return({
        loading: state.loading,
        weather: state.weather
    })
}

function mapDispatchToProps(dispatch){
    return{
        getWeather: (lat, long) => dispatch(ActionTypes.getWeather(lat, long))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);