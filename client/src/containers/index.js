import React, { Component } from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import '../styles/editor.css';
import { SERVER_URL } from '../config';

class Index extends Component{
    constructor () {
        super();
    }

    render(){
        return(
            <div id="index">
                <Navbar />
                <Sidebar />
            </div>

        );
    }
}

export default Index;

