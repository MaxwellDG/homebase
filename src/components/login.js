import React from 'react'
import MyForms from './myForms'
import axios from 'axios'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'

class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            Username: "",
            Password: "",
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        }, () => {
            this.validateField(name, value)
        })
    }

    validateField(field, value){
        let errors = this.state.errors
        let usernameValid = this.state.usernameValid
        let passwordValid = this.state.passwordValid
      
        switch(field) {
            case 'Username':
                usernameValid = value.match(/^[\w]+$/i) /* change this to your liking */
                console.log(usernameValid)
                errors.Username = usernameValid ? "" : 'Username is invalid. Alphanumerical characters only.'
                break;
            case 'Password':
                passwordValid = value.match(/^[\w]+$/i); /* change this to your liking */
                errors.Password = passwordValid ? "": 'Password is invalid. Alphanumerical characters only.'
                break;
            default:
                break;
          }
        this.setState({
            errors,
            usernameValid,
            passwordValid,
        }, this.validateForm());
    }

    validateForm(){
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid})
    }

    /* GET request from database for user. With successful response, change Redux state and set LocalStorage */
    handleLogin = (event, history) => {
        axios.get(`/account/login/${this.state.Username}/${this.state.Password}`)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    const allCollections = response.data.user[0].collections
                    let urlsObjects = Object()
                    Object.keys(allCollections).forEach(collection => {
                        urlsObjects[collection] = Object({urls: allCollections[collection].urls})
                    })          
                    /* setting Reducers */
                    this.props.setUser(response.data.user[0].username, response.data.user[0].location, true) 
                    this.props.setUserCollections(allCollections)
                    this.props.setCollectionUrls(urlsObjects) 

                    /* setting localStorage */
                    localStorage.setItem("user", response.data.user[0].username)
                    localStorage.setItem("password", response.data.user[0].password)
                    localStorage.setItem("collections", JSON.stringify(allCollections))
                    localStorage.setItem('location', JSON.stringify(response.data.user[0].location))
                    localStorage.setItem('urls', JSON.stringify(urlsObjects))
               
                    history.push("/")
                } else {
                    console.log(response.data.user)
                }
            }).catch(reason => {
                console.log("Client-side error: " + reason)
            })
        event.preventDefault();
    }

    render(){

        const { history } = this.props

        return(
            <MyForms formId="loginForm"
                     errors={ this.state.errors } 
                     submission= { (event) => this.handleLogin(event, history) }
                     submitText="Submit"
                     formValid={ this.state.formValid }
                     elements={ () => ( 
                        <React.Fragment>
                            <input className="formField" type="text" placeholder="Account name: " name="Username" onChange={ this.handleChange }/>
                            <input className="formField" type="text" placeholder="Password: " name="Password" onChange={ this.handleChange }/>
                        </React.Fragment>    
                                )
                             }         
            />
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
        setUser: (Username, location, bool) => dispatch(ActionTypes.setUser(Username, location, bool)),
        setUserCollections: (collections) => dispatch(ActionTypes.setUserCollections(collections)),
        setCollectionUrls: (urls) => dispatch(ActionTypes.setCollectionUrls(urls))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

