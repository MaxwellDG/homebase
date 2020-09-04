import React, { PureComponent } from 'react'
import { NavLink } from 'react-router-dom'

class NavButton extends PureComponent{

    render(){
        const { img, path } = this.props

        return(
            <li className="navButton">
                <NavLink exact to={ path }>
                    <button><img alt="icon_img" src={ img }></img></button>
                </NavLink>
            </li>
    )}
}

export default NavButton