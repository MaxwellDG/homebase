import React from 'react'
import MyForms from './myForms'
import Modal from 'react-modal'

export default class AddOptionContainer extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            newCollectionName: "",
            newCollectionNameValid: false,
            addAURL: "",
            currentList: [],
            selectType: " ",
            formValid: false,
            errors: {newCollectionName: "", currentList: []}
        }
        this.handleSubmitAdd = this.handleSubmitAdd.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleSubmitAdd(event){
        let newList = Object.assign([], this.state.currentList)
        if(this.state.currentList.length !== 0){
            const newLine = "\n"
            newList.push(newLine.concat(this.state.addAURL))
        } else {
            newList.push(this.state.addAURL)
        }
        this.setState((prevState) => ({
            addAURL: "",
            currentList: newList,
            errors: [],
            selectType: prevState.select
        }))
        event.preventDefault()
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
        let newCollectionNameValid = this.state.newCollectionNameValid
      
        switch(field) {
            case 'newCollectionName':
                newCollectionNameValid = value.match(/^[\w]+$/i)
                errors.newCollectionName = newCollectionNameValid ? "" : 'Name is invalid. Alphanumerical characters only.'
                break;
            default:
                break;
          }
        this.setState({
            errors,
            newCollectionNameValid,
        }, this.validateForm());
    }

    validateForm(){
        this.setState({formValid: this.state.newCollectionNameValid})
    }


    render(){

        return(
        <Modal
            isOpen={ true }
            shouldCloseOnOverlayClick={ true }
            onRequestClose={ () => this.props.toggleDisplay(false)}
            className={"modalContentAbout"}
            overlayClassName={"modalOverlay"}>

            <div id="createNewOption">
            <div id="modalTop">
                <h2 className="accountHeaders">Create a New Collection</h2>
                <button className="xButtons" onClick={ () => this.props.toggleDisplay(false) }>&times;</button>
            </div>
                <MyForms formId="addOptionForm"
                        errors={ this.state.errors }
                        submission={ (event) => {
                            this.props.addACollection(this.state.newCollectionName, this.state.selectType, this.state.currentList) 
                            event.preventDefault()
                            }
                        }
                        submitText="Submit"
                        formValid={ true }
                        elements={ () => ( 
                    <React.Fragment>
                        <div>
                            <label className="formText" htmlFor="newCollectionName">Name</label>
                            <input type="text" id="newCollectionName" name="newCollectionName" placeholder="Enter a name: " value={ this.state.newCollectionName } onChange={ this.handleChange }></input>
                        </div>
                        <div>
                            <label className="formText" htmlFor="addAURL">Url</label>
                            <input type="text" id="addAURL" name="addAURL" placeholder="Enter a Url: " value={ this.state.addAURL } onChange={ this.handleChange }/>
                            <button className="submitButtons" onClick={ this.handleSubmitAdd }>Add Url</button>
                        </div>
                        <div>
                            <label className="formText">Current Additions</label>
                            <textarea name="currentList" value={ this.state.currentList } onChange={ this.handleChange } readOnly={ true }></textarea>
                        </div>
                        <div>
                            <label className="formText">Collection Type</label>
                            <select id="selectType" name="selectType" value={ this.state.selectType } onChange={ this.handleChange }>
                                <option></option>
                                <option>Interests</option>
                                <option>News</option>
                                <option>Work</option>
                                <option>Socials</option>
                                <option>Bills</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </React.Fragment>  
                    )
                }  />
            </div>
        </Modal>
        )
    }
}