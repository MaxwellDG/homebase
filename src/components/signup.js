import React from 'react'
import MyForms from './myForms'
import axios from 'axios'
import { connect } from 'react-redux'
import * as ActionTypes from '../actions/action'


class SignUp extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            Username: "",
            Password: "",
            PasswordConfirm: "",
            usernameValid: false,
            passwordValid: false,
            passwordConfirmValid: false,
            formValid: false,
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
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
        let passwordConfirmValid = this.state.passwordConfirmValid
      
        switch(field) {
            case 'Username':
                usernameValid = value.match(/^[\w]+$/i)
                errors.Username = usernameValid ? "" : 'Username is invalid. Alphanumerical characters only.'
                break;
            case 'Password':
                passwordValid = value.match(/^[\w]+$/i)
                errors.Password = passwordValid ? "": 'Password is invalid. Alphanumerical characters only.'
                break;
            case "PasswordConfirm":
                passwordConfirmValid = this.state.Password === this.state.PasswordConfirm
                errors.PasswordConfirm = passwordConfirmValid ? "" : " Password entries do not match."  
                break;
            default:
                break;
          }
        this.setState({
            errors,
            usernameValid,
            passwordValid,
            passwordConfirmValid
        }, this.validateForm());
    }

    validateForm(){
        this.setState({formValid: this.state.usernameValid && this.state.passwordValid && this.state.passwordConfirmValid})
    }

    /* POST request to database for signup. With successful response, set Redux state and set LocalStorage */
    handleSubmit = (event, history) => {
        if(this.state.Password === this.state.PasswordConfirm){
          axios.post(`http://ec2-18-222-230-82.us-east-2.compute.amazonaws.com/account/signup/${this.state.Username}/${this.state.Password}`)
              .then(response => {
                if(response.status === 200){
                    console.log(response)
                    const allCollections = response.data.newUser.collections
                    let urlsObjects = Object()
                    Object.keys(allCollections).forEach(collection => {
                        urlsObjects[collection] = Object({urls: allCollections[collection].urls})
                    })          
                    /* setting Reducers */
                    this.props.setUser(response.data.newUser.username, response.data.newUser.location, true) 
                    this.props.setUserCollections(allCollections)
                    this.props.setCollectionUrls(urlsObjects) 

                    /* setting localStorage */
                    localStorage.setItem("user", response.data.newUser.username)
                    localStorage.setItem("password", response.data.newUser.password)
                    localStorage.setItem("collections", JSON.stringify(allCollections))
                    localStorage.setItem('location', JSON.stringify(response.data.newUser.location))
                    localStorage.setItem('urls', JSON.stringify(urlsObjects))
               
                    history.push("/home")
                } else if(response.status === 205) {
                    let errs = this.state.errors
                    errs.duplicate = "Username already exists."
                    this.setState({
                        errors: errs
                    })
                    console.log(response.data)
              }}).catch(error => {
                  console.log(error)
              }) 
      }
        event.preventDefault();
      }

    render(){
        const { history } = this.props

        return(
            <MyForms formId="signupForm"
                     errors={ this.state.errors }
                     submission={ (event) => this.handleSubmit(event, history) }
                     submitText="Submit"
                     formValid={ this.state.formValid }
                     elements={ () => ( 
                        <React.Fragment>
                            <input className="formField" type="text" placeholder="Account name: " name="Username" onChange={ this.handleChange }/>
                            <input className="formField" type="text" placeholder="Password: " name="Password" onChange={ this.handleChange }/>
                            <input className="formField" type="text" placeholder="Confirm Password: " name="PasswordConfirm" onChange={ this.handleChange }/>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)