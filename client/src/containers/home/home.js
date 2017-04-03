import React, { Component } from 'react'
import HomeLeftPanel from './homeLeftPanel';
import HomeRightPanel from './homeRightPanel';
import '../../styles/home.css';


class Home extends Component{
    render(){
        return(
            <div>
                <HomeLeftPanel />
                <HomeRightPanel />
            </div>
        )
    }
}

export default Home;
