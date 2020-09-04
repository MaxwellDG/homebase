import React, { Component } from 'react'
import NavButton from "../components/navButton"

class NavBar extends Component{

    render(){
        return(
            <span>
                <ol id="navButtonContainer">
                    <NavButton img="images/icons8-settings-128.png" path="/account" />
                    <NavButton img="images/icons8-home-128.png" path="/"/>    
                </ol> 
            </span>
        )}
}

export default NavBar