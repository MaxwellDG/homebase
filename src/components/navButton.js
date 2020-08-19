import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

class NavButton extends PureComponent{

    static propTypes = {
        text: PropTypes.string,
        path: PropTypes.string
    }

    render(){
        const { text, path } = this.props

        return(
            <li className="navButton"><NavLink exact to={ path }>{ text }</NavLink></li>
    )}
}

export default NavButton