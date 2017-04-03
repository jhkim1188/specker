import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {changeSidebarState } from '../actions/index';


class Navbar extends Component{


    constructor(props){
        super(props);
        this.sidebarBtnClicked = this.sidebarBtnClicked.bind(this);
    }

    sidebarBtnClicked(){
        this.props.changeSidebarState(!this.props.sidebarState);
    }

    render(){
        return(
            <div role="navigation" className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar" className="navbar-toggle collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button><Link to="/" className="navbar-brand">specker</Link>
                    </div>
                    <div id="navbar" className="navbar-collapse collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/surf"><img src="/surf.png" className="navbar-icon"/></Link></li>
                            <li><Link to="/"><img src="/team.png" className="navbar-icon"/></Link></li>
                            <li><a className="teamBtn" onClick={this.sidebarBtnClicked}><img src="/chat.png" className="navbar-icon"/></a></li>
                            <li><a href="#" data-toggle="dropdown" className="dropdown-toggle"><img src="/setting.png" className="navbar-icon"/> <b className="caret"></b></a>
                                <ul className="dropdown-menu">
                                    <li><a href="#">Profile</a></li>
                                    <li><a href="#">Message</a></li>
                                    <li><a href="#addCard" data-toggle="modal">Upload</a></li>
                                    <li className="divider"></li>
                                    <li><a href="#">Log out</a></li>
                                </ul>
                            </li>
                            <li className="dropdown"><a id="dLabel" role="button" data-toggle="dropdown" href="#"><img src="/alarm.png" className="navbar-icon"/></a>
                                <ul role="menu" aria-labelledby="dLabel" className="dropdown-menu notifications">
                                    <div className="notification-heading">
                                        <h4 className="menu-title">Notifications</h4>
                                        <h4 className="menu-title pull-right">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
                                    </div>
                                    <li className="divider"></li>
                                    <div className="notifications-wrapper"><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 · day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a><a href="#" className="content">
                                        <div className="notification-item">
                                            <h4 className="item-title">Evaluation Deadline 1 • day ago</h4>
                                            <p className="item-info">Marketing 101, Video Assignment</p>
                                        </div></a></div>
                                    <li className="divider"></li>
                                    <div className="notification-footer">
                                        <h4 className="menu-title">View all<i className="glyphicon glyphicon-circle-arrow-right"></i></h4>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>



        );
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({ changeSidebarState }, dispatch);
}
function mapStateToProps(state){
    return { sidebarState: state.index.sidebarState };
}




export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

