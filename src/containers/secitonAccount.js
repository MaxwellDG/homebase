import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../components/login'
import Signup from '../components/signup'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class SectionAccount extends React.Component{

    constructor(props){
        super(props)
        this.handleLogout = this.handleLogout.bind(this)
    }

    handleLogout(){
        this.props.setUser(null, [])
    }

    render(){
        if(this.props.userLoggedIn !== null) {
            return(
                /* a map interface to set the location you want */
                <div id="settingsLoggedInBlock">
                    <p>Map Goes Here </p>
                    <button onClick={ this.handleLogout }>Log Out</button>
                </div>
            )
        } else {
            return(
                <div id="account-flexbox-container">
                    <div id="account-flexbox-item1">
                        <h1 className="accountHeaders">Login</h1>
                        <Route component={ Login } />
                    </div>

                    <div id="account-flexbox-item2">
                        <h1 className="accountHeaders">Create Account</h1>
                        <Route component={ Signup } />
                        <p id="accountDisclaimer">*No phone number, no postal code, no need to know your mother's maiden name<br></br>
                        An account will simply allow you to post your jokes and review feedback numbers. An email will enable lost-password retreival</p>
                    </div>
                </div>
        )
    }
}
}

function mapStateToProps(state){
    return{
        userLoggedIn: state.userLoggedIn
    }
}

function mapDispatchToProps(dispatch){
    return{
        setUser: (username, location) => dispatch(ActionTypes.setUser(username, location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionAccount)