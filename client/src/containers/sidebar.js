import React, { Component } from 'react';

const Menu = require('react-burger-menu').slide;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeSidebarState } from '../actions/index';

import '../styles/sidebar.css';

class Sidebar extends Component{

    isMenuOpen(state){
        this.props.changeSidebarState(state.isOpen);

    }
    render(){
        return(
            <div id="outer-container">
                <Menu width={ 400 } onStateChange={ this.isMenuOpen.bind(this) } right pageWrapId={ "page-wrap" } customBurgerIcon={ false } isOpen={this.props.sidebarState} customCrossIcon={ false } outerContainerId={ "outer-container" }>
                    <div className="chatMenu col-xs-2">
                        hello
                    </div>
                    <div className="chatContent col-xs-10">hello</div>
                </Menu>

            </div>


        );
    }
}



function mapStateToProps(state){

    return { sidebarState: state.index.sidebarState };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeSidebarState }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);



