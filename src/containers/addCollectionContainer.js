import React from 'react'
import { connect } from 'react-redux'
import AddCollectionForm from '../components/addCollection'
import * as ActionTypes from '../actions/action'
import axios from 'axios'

class AddCollectionContainer extends React.Component{

    constructor(props){
        super(props)
        this.addCollection = this.addCollection.bind(this)
        this.toggleDisplay = this.toggleDisplay.bind(this)
    }

    addCollection(name, type, urls){
        axios.post(`/account/createcollection/${this.props.user}/${name}/${type}/${urls}`)
            .then(response => {
                if(response.status === 200){
                    const allCollections = response.data.collections
                    let urlsObjects = Object()
                    Object.keys(allCollections).forEach(collection => {
                        urlsObjects[collection] = Object({urls: allCollections[collection].urls})
                    })          
                    /* setting Reducers */
                    console.log(urlsObjects)
                    this.props.setCollectionUrls(urlsObjects)
                    this.props.setUserCollections(allCollections)
 

                    /* setting localStorage */
                    localStorage.setItem("collections", JSON.stringify(allCollections))
                    localStorage.setItem('urls', JSON.stringify(urlsObjects))

                    this.toggleDisplay(false)
                }}).catch(err => {
                    console.log(err)
            })
    }

    toggleDisplay(boolean){
        this.props.displayAddCollections(boolean)
    }

    render(){

        return(
            <div>
                { this.props.display ? <AddCollectionForm user={ this.props.user } toggleDisplay={ this.toggleDisplay } addACollection={ this.addCollection } /> : null }
            </div>
        )
    }
}

function mapStateToProps(state){
    return({
        user: state.userReducer.userLoggedIn,
        display: state.displayReducer.addCollectionDisplay
    })
}

function mapDispatchToProps(dispatch){
    return{
        setUserCollections: (collections) => dispatch(ActionTypes.setUserCollections(collections)),
        displayAddCollections: (boolean) => dispatch(ActionTypes.displayAddCollection(boolean)),
        setCollectionUrls: (urls) => dispatch(ActionTypes.setCollectionUrls(urls))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCollectionContainer)