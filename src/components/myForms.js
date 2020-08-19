import React from 'react'

export default class MyForms extends React.Component{

    render(){
        return(
            <div>
                <ErrorsDisplay errors={ this.props.errors } />
                <form onSubmit={ this.props.componentOnSubmit } >
                    { this.props.elements() }
                    <div className="formButtonsContainer">
                        <button className="buttonSubmit" type="submit"> Submit </button>
                        <button className="buttonCancel" onClick={ this.props.onCancel }> Cancel </button>
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
          { 
              // this is cool af too! It takes the list of errors and maps each one to become its own list item. Also uses the index iteration to grab the respective erorr descriptions 
          }
            <ul>
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        </div>
      );
    }
  
    return errorsDisplay;
  }