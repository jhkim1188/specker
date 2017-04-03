import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField'


const WizardFormFirstPage = (props) => {
    const { handleSubmit, onSubmit, falsePassword } = props;

    return (
        <form onSubmit={handleSubmit(props.authUser)}>
            <Field name="email" type="email" component={renderField} label="Email"/>
            <Field name="password" type="password"  falsePassword={falsePassword} component={renderField} label="Password"/>

            <div>
                <button type="submit" className="next">Next</button>
            </div>
        </form>
    )
};

export default reduxForm({
    form: 'wizard',                 // <------ same form name
    destroyOnUnmount: false,        // <------ preserve form data
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate,
})(WizardFormFirstPage)