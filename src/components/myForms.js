import React from 'react'

export default class MyForms extends React.Component{

    render(){
        return(
            <div id={ this.props.formId }> 
                <ErrorsDisplay errors={ this.props.errors } />
                <form onSubmit={ this.props.submission  } >
                    { this.props.elements() }
                    <div className="formButtonsContainer">
                        <button className="buttonSubmit" type="submit"> { this.props.submitText } </button>
                    </div>
                </form>
            </div>
        )
    }
}


function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;
    
    if (errors.length) {
      errorsDisplay = (
        <div>
          <h2 className="validation--errors--label">Validation errors</h2>
          <div className="validation-errors">
            <ul>
              {errors.map((error, i) =>
                <li key={i}>{error}</li>
               )}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }