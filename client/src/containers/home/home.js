import React, { Component } from 'react'
import HomeLeftPanel from './homeLeftPanel';
import HomeRightPanel from './homeRightPanel';
import FeedReadMore from '../feed/feedReadMore';
import '../../styles/home.css';


class Home extends Component{
    render(){
        return(
            <div>
                <HomeLeftPanel />
                <HomeRightPanel />
                <FeedReadMore />
            </div>
        )
    }
}

export default Home;
