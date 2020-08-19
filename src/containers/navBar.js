import React, { Component } from 'react'
import NavButton from "../components/navButton"

class NavBar extends Component{

    render(){
        return(
            <span>
                <ol id="navButtonContainer">
                    <NavButton text="Settings" path="/about" />
                    <NavButton text="Data" path="/account"/>    
                    <NavButton text="Home" path="/data"/>    
                </ol> 
            </span>
        )}
}

export default NavBar