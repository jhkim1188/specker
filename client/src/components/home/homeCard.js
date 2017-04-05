import React, { Component } from 'react';
import Card from 'react-material-card';

import { EditorState, convertFromHTML, RichUtils, ContentState, CompositeDecorator, convertFromRaw } from 'draft-js';


import Editor,{composeDecorators} from 'draft-js-plugins-editor';
import { convertToHTML } from 'draft-convert';
// import { Editor } from 'react-draft-wysiwyg';
import { fromJS } from 'immutable';
import { SERVER_URL } from '../../config';


import Parser from 'html-react-parser';




class HomeCard extends Component{

    constructor(props) {
        super(props);


        console.log(props);
        const thumb = this.props.feed.thumb;
        let html =thumb.title +thumb.content+'<div class="feed-content">'+
                '<a class="home-feed-more">'+
                    "내용읽기"+
                '</a> </div>';
        if(thumb.img!=undefined){
            html = html+'<br>'+thumb.img;
        }


        this.state = {
            editorState: html
        };
    }

    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    render(){
        const img = this.props.feed.thumb.img;
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
                          {this.props.feed.user.name}
                        </div>


                    </div>
                    <div className="homeFeedThumb">
                        {Parser(this.state.editorState)}
                    </div>
                    <hr className="divider"/>

                    <div className="homeFeedBtnWrapper">
                            <li className="homeFeedIcon"><img src="/like.png" width={32} height={34} /></li>
                            <li className="homeFeedIcon"><img src="/unlike.png" width={16.04} height={26.01} /></li>
                            <li className="homeFeedIcon"><img src="/share.png" width={38} height={26}/></li>
                    </div>

                </Card>
            </div>
        );
    }

}



export default HomeCard;