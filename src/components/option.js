import React from 'react'

export default class Option extends React.Component{

    constructor(props){
        super(props)
        this.createWindows = this.createWindows.bind(this)
    }

    createWindows(urls){
        urls.forEach(element => {
            window.open("http://www." + element, "_blank")
        });
    }

    render(){
        const { imageSrc, createDeleteWindow, createAddWindow, type, urls } = this.props

        const optionUrls = urls.map((url, index) => 
        (
            <li key={ index }>
                <a>{ url }</a>
            </li>
        ))

        return(
            <div className="optionBoxTotal" onClick={ () => this.createWindows(urls) }>
                <div className="optionImageBox">
                    <img className="optionImage" alt="img_alt" src={ imageSrc }></img>
                    <button className="optionX" onClick={ createDeleteWindow }>X</button>
                    <p className="optionTypeText">{ type }</p>
                </div>
                <div className="optionContents">
                    <span style={{textAlign: "right", display: "block"}}><button className="optionAdd" onClick={ createAddWindow }><a>+</a></button></span>
                    <ul className="optionLocationItems">
                        { optionUrls }
                    </ul>
                    { this.props.children }
                </div>
            </div>
        )
    }
}
