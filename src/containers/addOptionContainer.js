import React from 'react'
import MyForms from '../components/myForms'
import Axios from 'axios'
import { connect } from 'react-redux'

class AddOptionContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            addAURL: "",
            currentList: [],
            select: "",
            errors: []
        }
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitFinish = this.handleSubmitFinish.bind(this)
    }

    handleSubmitAdd(event){
        let newList = this.state.currentList.slice()
        console.log(newList)
        newList.push(this.state.addAURL)
        this.setState((prevState) => ({
            addAURL: "",
            currentList: newList,
            errors: [],
            select: prevState.select
        }))
        event.preventDefault()
    }

    handleSubmitFinish(event){
        console.log(this.state.select)
        const urlsArray = formatUrl(this.state.currentList)
        console.log(urlsArray)
        if(this.props.user !== null){
            Axios.post(`/addOption/${this.props.user}/${this.selectRef.value}/${urlsArray}`)
        } else {
            console.log("User is not logged in somehow?")
        }
        event.preventDefault()
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    render(){
        return(
            <div id="createNewOption">
                <MyForms formId="addOptionForm"
                         errors={ this.state.errors }
                         submission={ this.handleSubmitAdd }
                         submitText="Add To List"
                         elements={ () => ( 
                    <React.Fragment>
                    <input className="formField" type="text" placeholder="Enter a URL: " name="addAURL" value={ this.state.addAURL } onChange={ this.handleChange }/>
                    <textarea className="formField" value={ this.state.currentList } onChange={ this.handleChange }></textarea>
                    <select id="selectType" className="formField" name="select" value={ this.state.select } onChange={ this.handleChange }>
                        <option>Socials</option>
                        <option>News</option>
                        <option>Work</option>
                        <option>Interests</option>
                        <option>Bills</option>
                        <option>Other</option>
                    </select>
                    </React.Fragment>  
                    )
                }  />
                <MyForms formId="submitOptionForm"
                         errors={ this.state.errors }
                         submitText="Submit"
                         submission={ this.handleSubmitFinish }
                         elements ={ () => (
                            <React.Fragment>
                            </React.Fragment>
                        )}
                />
            </div>
        )
    }
}

function formatUrl(allUrls){
    const marker = "www"
    return allUrls.map(element => {
        if(element.contains(marker)){
            const newItem = element.split(marker, 2)
            console.log(newItem)
            return newItem[1]
        } else {
            return element
        }
    });
}

function mapStateToProps(state){
    return({
        user: state.userLoggedIn
    })
}

export default connect(mapStateToProps)(AddOptionContainer)