import React, { Component } from 'react';

import WizardForm from '../../components/signin/wizardForm';

class SignInRightPanel extends Component{
    render(){
        return(
            <div id="signin-right-panel">
                <WizardForm onSubmit={this.props.signUp} />
            </div>
        );
    }
}


export default SignInRightPanel;

