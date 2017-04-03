import React, { Component } from 'react';
import Modal from 'react-modal';
import { bindActionCreators } from 'redux';
import { signUp } from '../../actions/index';
import { connect } from 'react-redux';

import '../../styles/signin.css';

import SignInLeftPanel from './signInLeftPanel';
import SignInRightPanel from './signInRightPanel';

const customStyles = {
    overlay : {
        position          : 'fixed',
        top               : 0,
        left              : 0,
        right             : 0,
        bottom            : 0,
        backgroundColor   : 'rgba(255, 255, 255, 0.75)'
    },
    content : {
        position                   : 'absolute',
        top                        : '95px',
        left                       : '40px',
        right                      : '40px',
        bottom                     : '40px',
        border                     : '1px solid #ccc',
        background                 : '#fff',
        overflow                   : 'auto',
        WebkitOverflowScrolling    : 'touch',
        borderRadius               : '4px',
        outline                    : 'none',
        padding                    : '0px',
        zIndex:9999

    }
}

class SignIn extends Component{
    constructor() {
        super();
        this.state = {
            modalIsOpen: true
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }


    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>Open Modal</button>
                <Modal
                    isOpen={this.props.modalState}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={false}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <SignInLeftPanel />
                    <SignInRightPanel signUp={this.props.signUp} />
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {modalState:state.auth.modalState};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ signUp }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);