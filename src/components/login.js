import React from 'react'
import MyForms from './myForms'
import axios from 'axios'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleLogin.bind(this)
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleLogin = (event) => {
        axios.get(`/account/login/${this.state.username}/${this.state.password}`)
            .then(response => {
                if(response.data.user.length === 1){
                    this.props.setUser(response.data.user[0].username, response.data.user[0].location) 
                } else {
                    console.log(response.data.user)
                }
            }).catch(reason => {
                console.log("Client-side error: " + reason)
            })
        event.preventDefault();
    }

    render(){
        return(
            <MyForms formId="loginForm"
                     errors={ this.state.errors } 
                     submission= { this.handleLogin }
                     submitText="Submit" 
                     elements={ () => ( 
                        <React.Fragment>
                            <input className="formField" type="text" placeholder="Account name: " name="username" onChange={ this.handleChange }/>
                            <input className="formField" type="text" placeholder="Password: " name="password" onChange={ this.handleChange }/>
                        </React.Fragment>    
                )
            }/>
        )
    }
}

function mapStateToProps(state){
    return{
        state
    }
}

function mapDispatchToProps(dispatch){
    return{
        setUser: (username, location) => dispatch(ActionTypes.setUser(username, location))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

