import React, { Component } from 'react';
import Card from 'react-material-card';
import ReactQuill, { Quill } from 'react-quill';


class SurfCard extends Component{
    render(){
        return(
            <div className="surfCard">
                <Card
                    style={{ marginTop: 20}}
                    borderRadius={3}
                    onOver={card => card.setLevel(2)}
                    onOut={card => card.setLevel(1)}
                    key={this.props.key}>

                    <ReactQuill
                        readOnly={true}
                        value={this.props.content}
                    >
                    </ReactQuill>


                    <div className="feed-content">
                        <a className="home-feed-more">
                            더보기
                        </a>
                    </div>
                </Card>
            </div>
        )
    }
}

export default SurfCard;
