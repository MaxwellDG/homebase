import React from 'react'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class WeatherContainer extends React.Component{

    componentDidMount(){
       /* this.props.fetchGetWeather("43.6532", "-79.3832") */
    }

    render(){
        const { weather, loading } = this.props
        const celcius = ((parseFloat(weather.weatherTemperature) - 32) * (5/9)).toFixed(1)
        const windSpeed = parseInt(weather.weatherWind)

        if(!loading){
            return(
                <div id="weatherContainer">
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
        } else {
            return(
                <div>
                    <p>Loading... Please wait.</p>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return({
        loading: state.loading,
        weather: state.weather
    })
}

function mapDispatchToProps(dispatch){
    return{
        fetchGetWeather: (lat, long) => dispatch(ActionTypes.fetchGetWeather(lat, long))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherContainer);