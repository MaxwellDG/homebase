import React from 'react'

export default class Option extends React.Component{

    render(){

        const { imageAlt, imageSrc, createDeleteWindow, createAddWindow, type } = this.props


        return(
            <div>
                <div className="optionImageBox">
                    <image className="optionImage" alt={ imageAlt } src={ imageSrc }></image>
                    <button className="optionX" onClick={ createDeleteWindow }>X</button>
                </div>
                <p className="optionTypeText">{ type }</p>
                <div className="optionContents">
                    <span><button className="optionAdd" onClick={ createAddWindow }>+</button></span>
                    { this.props.children }
                </div>

            </div>
        )
    }
}

/* function aDestination(url, text){
    return(
        <div>
            <a href={ url } taget="_blank" ref="noopener noreferrer">{ text }</a>
        </div>
    )
} */

