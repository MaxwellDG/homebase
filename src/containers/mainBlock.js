import React from 'react'
import Option from '../components/option'
import { defaultOptions } from '../data/defaultOptions'
import { connect } from "react-redux"
import * as ActionTypes from '../actions/action'

class MainBlock extends React.Component{

    render(){

        const startingOptions = defaultOptions.map((option, index) => 
                <li key={ index }>
                    <Option imageAlt={ option.optionImageAlt } imageSrc={ option.optionImageSrc } type={ option.optionType }></Option>
                </li>
            )

        return(
            <div id="mainBlock">
                <ul id="optionsContainer">
                    { startingOptions }
                </ul>    
            </div>
        )

    }

}

function mapStateToProps(state){
    return({
        defaultOptions: state.weather
    })
}

function mapDispatchToProps(dispatch){
    return{
        getWeather: () => dispatch(ActionTypes.getWeather())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock)