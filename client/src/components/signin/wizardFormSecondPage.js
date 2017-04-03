import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'

import GeoSuggest from './geoSuggest';

const renderError = ({ meta: { touched, error } }) => touched && error ?
    <span>{error}</span> : false;



class WizardFormSecondPage extends Component{

    render() {
        const {handleSubmit, previousPage} = this.props;
        return (
        <form onSubmit={handleSubmit}>
            <Field name="name" type="text" component={renderField} label="name"/>
            <Field name="age" type="text" component={renderField} label="age" placeholder="ex)23"/>
            <div>
                <label>성별</label>
                <div>
                    <label><Field name="sex" component="input" type="radio" value="남자"/> Male</label>
                    <label><Field name="sex" component="input" type="radio" value="여자"/> Female</label>
                    <Field name="sex" component={renderError}/>
                </div>
            </div>
            <div>
                <Field name="address" component={GeoSuggest}/>
            </div>
            <div>
                <button type="button" className="previous" onClick={previousPage}>Previous</button>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    )
    }
}


export default reduxForm({
    form: 'wizard',  //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(WizardFormSecondPage)