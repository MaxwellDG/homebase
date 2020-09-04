import React from 'react'
import { connect } from 'react-redux'
import Option from '../components/option'
import * as ActionTypes from '../actions/action'
import axios from 'axios'

class SectionHome extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        axios.get
    }

    render(){
        const startingOptions = this.props.options.map((option, index) => 
            <li key={ index }>
                <Option imageAlt={ option.alt }
                        imageSrc={ option.imgSrc }
                        type={ option.name } 
                        urls={ option.urls }>
                </Option>
            </li>
        )
        if(this.props.user !== null){
        return(
                <ul id="optionsContainer">
                    { startingOptions }
                </ul>
            )
        } else {
            return(
                <div>
                    <p style={{color: "white"}}>Please login to retreive your account settings.</p>
                </div>
            )}
    }
}

function mapStateToProps(state){
    return({
        user: state.userLoggedIn,
        options: state.options
    })
}

function mapDispatchToProps(dispatch){
    return{
        getWeather: (lat, long) => dispatch(ActionTypes.getWeather(lat, long))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionHome);