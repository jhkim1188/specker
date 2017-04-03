import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
import renderField from './renderField';
import '../../styles/react-tag-input.css';
import TagSuggest from './tagSuggest';

const normalizePhone = (value) => {
    if (!value) {
        return value
    }

    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`
}


class WizardFormThirdPage extends Component{

    render(){
        const { handleSubmit, pristine, previousPage, submitting } = this.props;

        return (
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    name="phone"
                    component="input"
                    type="text"
                    placeholder="Phone Number"
                    normalize={normalizePhone}
                />
            </div>
            <div>
                <Field name="tag" component={TagSuggest}/>
            </div>
            <div>

                <button type="button" className="previous" onClick={previousPage}>Previous</button>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
            </div>
        </form>
    )
}
}
export default reduxForm({
    form: 'wizard', //Form name is same
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,  // <------ unregister fields on unmount
    validate
})(WizardFormThirdPage);