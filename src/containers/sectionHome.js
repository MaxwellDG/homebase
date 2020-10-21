import React from 'react'
import { connect } from 'react-redux'
import Collection from '../components/collection'
import * as ActionTypes from '../actions/action'
import axios from 'axios'

class SectionHome extends React.Component{

    constructor(props){
        super(props)
        this.updateCollection = this.updateCollection.bind(this)
        this.deleteTheCollection = this.deleteTheCollection.bind(this)
        this.createWindows = this.createWindows.bind(this)
    }

    /* Opens a tab to a specified URL. Formatting controls for the variety of input styles the user could have used */
    createWindows(urls){
        urls.forEach(element => {
            window.open(formatUrl(element))
        });
    }

    /* Handle database updates. Upon successful response, call the appropriate Redux actiontype */
    updateCollection(url, collectionName, updateType, index){
        console.log(this.props.user)
        axios.post(`https://api.homebase.design/account/updatecollection/${updateType}/${this.props.user}/${collectionName}/${url}`)
            .then(response => {
                if(response.status === 200){
                    console.log(response)
                    const data = response.data
                    if(updateType === "add"){
                        this.props.addUrl(url, collectionName, index)
                    } else if (updateType === "minus"){
                        this.props.minusUrl(url, collectionName, index)
                    }
                    const allCollections = data.collections
                    let urlsObjects = Object()
                    Object.keys(allCollections).forEach(collection => {
                        urlsObjects[collection] = Object({urls: allCollections[collection].urls})
                    })
                    /* updating pertinent reducers */
                    this.props.setUserCollections(allCollections)
                    this.props.setCollectionUrls(urlsObjects)

                    /* updating pertinent localStorage */
                    localStorage.setItem("collections", JSON.stringify(allCollections))
                    localStorage.setItem("urls", JSON.stringify(urlsObjects))
                }
            }).catch(reason => {
                console.log(reason)
            })
    }

    /* Delete the collection from database. Upon successful response, delete from Redux */
    deleteTheCollection(collectionName){
        console.log(collectionName)
        axios.post(`https://api.homebase.design/account/deletecollection/${this.props.user}/${collectionName}`)
            .then(response => {
                this.props.setUserCollections(response.data.collections)
                localStorage.setItem('collections', JSON.stringify(response.data.collections))
            }).catch(reason => {
                console.log(reason)
            })
    }

    render(){  
        const { collections, theUrls } = this.props
        
        let startingOptions = null
        if(collections !== null){
            startingOptions = Object.keys(collections).map((collection, index) => {
            return(
            <li key={ index }>
                <Collection
                        index={ index }     
                        imageSrc={ getOptionImage(collections[collection].collectionType) }
                        name={ collections[collection].name }
                        type={ collections[collection].collectionType } 
                        urls={ theUrls[collection].urls }
                        createWindows = { this.createWindows }
                        onUpdate={ this.updateCollection }
                        onDelete={ this.deleteTheCollection }> 
                </Collection>
            </li>
            )}
        )}

        return(
            <ul id="optionsContainer">
                { startingOptions ?  startingOptions : null }
            </ul> 
        )
    }
}

function getOptionImage(type){
    switch(type){
        case "Work":
            return 'images/bag.png'
        case "Socials":
            return 'images/like.png'
        case "Interests":
            return 'images/paintbrush.png'
        case "Bills":
            return 'images/money.png'
        case "News":
            return 'images/megaphone.png'
        default:
            return 'images/speed.png'                
    }
}

function formatUrl(text){
    switch(text.substring(0, 4)){
        case "www.":
            return "http://".concat(text)
        case "http":
            return text
        default:
            return "http://www.".concat(text)        
    }
}

function mapStateToProps(state){
    return({
        user: state.userReducer.userLoggedIn,
        loggedIn: state.userReducer.loggedIn,
        password: state.userReducer.password,
        collections: state.collectionsReducer,
        theUrls: state.urlsReducer
    })
}

function mapDispatchToProps(dispatch){
    return{
        getWeather: (lat, long) => dispatch(ActionTypes.getWeather(lat, long)),
        addUrl: (url, name, index) => dispatch(ActionTypes.addUrl(url, name, index)),
        minusUrl: (url, name, index) => dispatch(ActionTypes.minusUrl(url, name, index)),
        setUser: (username, location) => dispatch(ActionTypes.setUser(username, location)),
        setUserCollections: (collections) => dispatch(ActionTypes.setUserCollections(collections)),
        setCollectionUrls: (urls) => dispatch(ActionTypes.setCollectionUrls(urls))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionHome);