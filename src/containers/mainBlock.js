import React from 'react'
import { connect } from "react-redux"
import * as ActionTypes from '../actions/action'
import SectionHome from '../containers/sectionHome'
import { Route, Switch } from 'react-router-dom'
import Section404 from '../components/section404'
import SectionAccount from '../containers/secitonAccount'

class MainBlock extends React.Component{

    render(){

        return(
            <div id="mainBlock">
                <Switch>
                    <Route exact path='/account' render={ () => <SectionAccount />}/>
                    <Route exact path='/' render={ () =>  <SectionHome /> }/>
                    <Route component={ Section404 }/>
                </Switch>
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        userLoggedIn: state.userLoggedIn,
        location: state.location,
        defaultOptions: state.weather
    })
}

function mapDispatchToProps(dispatch){
    return{
        getWeather: () => dispatch(ActionTypes.getWeather())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainBlock)