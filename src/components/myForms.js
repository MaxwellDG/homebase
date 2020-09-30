import React from 'react'

export default class MyForms extends React.Component{

    render(){
        return(
                <form onSubmit={ this.props.submission  } id={ this.props.formId } >
                    <ErrorsDisplay errors={ this.props.errors } />
                    { this.props.elements() }
                    <input type="submit" className="submitButtons" value={ this.props.submitText }/>
                </form>
        )
    }
}


function ErrorsDisplay(errors) {

  let currentError = []
  const errorsArray = Object.values(errors.errors)
  errorsArray.forEach((value, index) => {
    if(value.length > 0){
      currentError = [value]
    }
  })

  let errorsDisplay = null;
  errorsDisplay = (
      <div className="validation-errors-container" >       
          <ul>
            <li key={0}>{currentError}</li>
          </ul>
      </div>
    )
  return errorsDisplay;
  }
  
  /* style={{visibility: currentError.length > 0 ? "visible" : "hidden"}} */