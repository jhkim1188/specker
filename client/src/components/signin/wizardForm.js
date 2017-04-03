import React, { Component, PropTypes } from 'react'
import WizardFormFirstPage from './wizardFormFirstPage'
import WizardFormSecondPage from './wizardFormSecondPage'
import WizardFormThirdPage from './wizardFormThirdPage'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../actions/index';

class WizardForm extends Component {
    constructor(props) {
        super(props);
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1
        }
    }
    nextPage() {

        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    render() {
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (<div>
                {page === 1 && <WizardFormFirstPage falsePassword = {this.props.falsePassword} authUser={this.props.signIn} onSubmit={this.nextPage}/>}
                {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
                {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
            </div>
        )
    }
}

WizardForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
};


function mapStateToProps(state){
    if(state.auth.error!=undefined)
    return { falsePassword:state.auth.error };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signIn }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm);
