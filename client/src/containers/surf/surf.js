import React, { Component } from 'react';
import SurfTopPanel from './surfTopPanel';
import SurfBottomPanel from './surfBottomPanel';

import '../../styles/surf.css';

class Surf extends Component{
    render(){
        return(
            <div className="surfContainer">
                <SurfTopPanel/>
                <SurfBottomPanel/>
            </div>
        )
    }
}

export default Surf;