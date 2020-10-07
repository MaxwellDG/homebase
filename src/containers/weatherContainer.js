import React from 'react'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class WeatherContainer extends React.Component{

    componentDidMount(){
        let coords = this.props.location ? this.props.location : {lat: 43.65121272925317, lng: -79.40022880021183}
        this.props.fetchGetWeather(coords)
    }

    render(){
        const { weather } = this.props
        const celcius = ((parseFloat(weather.weatherTemperature) - 32) * (5/9)).toFixed(1)
        const windSpeed = parseInt(weather.weatherWind)

        return(
            <div id="weatherContainer" style={{visibility: this.props.user ? "visible" : "hidden"}}>
                <img alt={ weather.weatherAlt } src={ weather.weatherImage }></img> 
                <p className="weatherBigText">{ weather.weatherLocation }</p>
                <p>{ weather.weatherDescription }</p>
                <p className="weatherBigText">{ celcius }&#8451;</p>
                <div id="weatherNumbers">
                    <label className="weatherLabels">Precip %<p className="weatherBigText">{ weather.weatherPrecipitationChance }</p></label>
                    <label className="weatherLabels">Wind Speed<p className="weatherBigText">{ windSpeed + "km/h" }</p></label>
                </div>
            </div>
        )
    } 
}

function mapStateToProps(state){
    return({
        user: state.userReducer.userLoggedIn,
        location: state.userReducer.location,
        weather: state.userReducer.weather
    })
}

function mapDispatchToProps(dispatch){
    return{
        fetchGetWeather: (coords) => dispatch(ActionTypes.fetchGetWeather(coords))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);