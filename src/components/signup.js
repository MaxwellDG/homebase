import React from 'react'
import MyForms from './myForms'
import axios from 'axios'

export default class SignUp extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            passwordConfirm: "",
            errors: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (event) => {
        if(this.state.password === this.state.passwordConfirm){
          axios.post(`/account/signup/${this.state.username}/${this.state.password}`)
              .then(res => {
                  console.log(res)
                  if(res){
                    /* localStorage.setItem("loggedUser", this.state.name) */
                  }
              }).catch(error => {
                  console.log(error)
              }) 
      }
        event.preventDefault();
      }

    render(){
        return(
            <MyForms formId="signupForm"
                     errors={ this.state.errors }
                     submission={ this.handleSubmit }
                     submitText="Submit"
                     elements={ () => ( 
                <React.Fragment>
                    <input className="formField" type="text" placeholder="Account name: " name="username" onChange={ this.handleChange }/>
                    <input className="formField" type="text" placeholder="Password: " name="password" onChange={ this.handleChange }/>
                    <input className="formField" type="text" placeholder="Confirm password: " name="passwordConfirm" onChange={ this.handleChange }/>
                </React.Fragment>  
                )
            }  />
        )
    }
}