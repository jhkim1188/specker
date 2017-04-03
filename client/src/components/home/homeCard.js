import React, { Component } from 'react';
import Card from 'react-material-card';
import ReactQuill, { Quill } from 'react-quill';


class HomeCard extends Component{

    render(){
        return(
            <div className="homeCard">
                <div className="thumb">
                    <img src={this.props.thumb} />
                </div>
                <Card
                    style={{ marginTop: 20}}
                    borderRadius={3}
                    onOver={card => card.setLevel(2)}
                    onOut={card => card.setLevel(1)}
                    key={this.props.key}>
                    <div className="row card-title">
                        <div className="col-xs-2 card-title-author-wrapper">
                            <a className="card-title-author">sanghyun</a>
                        </div>
                        <div className="col-xs-10 card-title-text-wrapper">
                            <a className="card-title-text">hello</a>
                        </div>

                    </div>
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
        );
    }
}


export default HomeCard;