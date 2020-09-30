import React from 'react'

export default class Collection extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            displayInput: false,
            displayX: false,
            urlText: "",
            longestWidth: 0
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (func, name, event, index) => {
        func(this.state.urlText, name, "add", index)
        this.toggleAddInput()
        event.preventDefault()
    }

    toggleAddInput(){
        this.setState((prevState) => ({
            displayInput: !prevState.displayInput,
            displayX: false
        }))
    }

    toggleMinusUrl(){
        this.setState((prevState) => ({
            displayInput: false,
            displayX: !prevState.displayX
        }))
    }

    createAlertDeleteUrl(deleteFunc, name, url, event, index){
        this.setState({
            displayInput: false
        })
        if(window.confirm("Are you sure you'd like to delete this url?")){
            deleteFunc(url, name, "minus", index)
        }
        event.preventDefault()
    }

    createAlertDeleteCollection(name, deleteFunc){
        if(window.confirm("Are you sure you'd like to delete this collection?")){
            deleteFunc(name)
        }
    }

    render(){
        const { index, imageSrc, type, urls, name, onUpdate, onDelete, createWindows } = this.props
        let xDisplay = this.state.displayX ? "visible" : "hidden"

        /* mapping the urls for each collection into a list */
        /* X visibility is toggled with local state */
        let collectionUrls = []
        if(urls){
            collectionUrls = urls.map((url, index) =>
            (
                <li className="aUrl" key={ index }>
                    <p>{ url }</p>
                    { <button style={{visibility: xDisplay}} onClick={ (event) => this.createAlertDeleteUrl(onUpdate, name, url, event, index)}>X</button> }
                </li>
            ))
        }
        

        /* the input field for adding a new url (visibility is toggled with local state) */
        let inputNewUrl = (
            <form onSubmit={ (event) => this.handleSubmit(onUpdate, name, event, index) }>
                <input type="text" id="inputAddCollection" placeholder="Url: " name="urlText" value={ this.state.urlText } onChange={ this.handleChange }></input>
                <input type="submit" id="inputAddCollectionSubmit" className="submitButtons" value="Add Url"></input>
            </form>
        )

        return(
            /* add "urls" to the function params below */
            <div className="optionBoxTotal"> 
                <div className="optionImageBox">
                    <img className="optionImage" alt="img_alt" src={ imageSrc } onClick={ () => createWindows(urls) }></img>
                    <button className="optionX" onClick={ () => this.createAlertDeleteCollection(name, onDelete) }>X</button>
                    <p style={{color: "white", margin: "3px"}}>{ type }</p>
                    <p className="optionTypeText">{ name }</p>
                </div>
                <div className="optionContents">
                <div className="optionPlusMinusBox">
                    <button className="optionPlus" onClick={ () => this.toggleAddInput() }>+</button>
                    <button className="optionMinus" onClick={ () => this.toggleMinusUrl() }>-</button>
                </div>    
                <ul className="optionLocationItems">
                    { collectionUrls.length > 0 ? collectionUrls : null }
                    { this.state.displayInput ? inputNewUrl : null }
                </ul>
                </div>
            </div>
        )
    }
}
