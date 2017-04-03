import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill'
import Card from 'react-material-card';
import '../../styles/mentionStyles.css';

import Mentions from '../editor/mentions';
import 'react-quill/dist/quill.snow.css';

const Inline = Quill.import('blots/inline');

class MentionBlot extends Inline {
    static create(id) {
        const node = super.create();
        node.dataset.id = id;
        return node;
    }
    static formats(node) {
        return node.dataset.id;
    }
    format(name, value) {
        if (name === "mention" && value) {
            this.domNode.dataset.id = value;
        } else {
            super.format(name, value);
        }
    }

    formats() {
        const formats = super.formats();
        formats['mention'] = MentionBlot.formats(this.domNode);
        return formats;
    }
}

MentionBlot.blotName = "mention";
MentionBlot.tagName = "SPAN";
MentionBlot.className = "mention";


Quill.register({'formats/mention': MentionBlot});
Quill.register('modules/mentions', Mentions);


const CustomToolbar = (props) => (
    <div id="toolbar">
       <span className="ql-formats" group="1">
        <select className="ql-size"></select>
      </span>
        <span className="ql-formats" group="2">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <button className="ql-strike"></button>
      </span>
        <span className="ql-formats" group="3">
        <select className="ql-color"></select>
        <select className="ql-background"></select>
      </span>

        <span className="ql-formats" group="5">
        <button className="ql-blockquote"></button>
        <button className="ql-code-block"></button>
      </span>
        <span className="ql-formats" group="6">
        <button className="ql-list" value="ordered"></button>
        <button className="ql-list" value="bullet"></button>
        <select className="ql-align"></select>
      </span>
        <span className="ql-formats" group="7">
        <button className="ql-link"></button>
        <button className="ql-image"></button>
            <button className="ql-video"></button>
        <button className="ql-formula"></button>
      </span>
        <span className="ql-formats" group="8">
        <button className="ql-indent" value="-1"></button>
        <button className="ql-indent" value="+1"></button>
        <button className="ql-direction" value="rtl"></button>
      </span>
        <span className="ql-formats ql-send-container">
          <button onClick={props.onSend} type="button" className="btn btn-primary ql-send-btn ql-send" >
            올리기
          </button>
        </span>
    </div>
);




class HomeEditor extends Component{

    constructor(props){
        super(props);
        this.state = { editorHtml: '' }
        this.handleChange = this.handleChange.bind(this);
        this.send = this.send.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    onKeyUp(event){
        console.log("onKeyUp", event);

    }
    handleChange(html) {
        this.setState({editorHtml: html});
    }

    send(){
        this.props.onSend(this.state.editorHtml.toString());
    }

    render() {
        return (
            <div className="editorCard">
                <div className="thumb">
                    <img src={this.props.user.gravatar}/>
                </div>
                <Card
                    className="editorContainer"
                    style={{ marginTop: 20}}
                    borderRadius={3}
                    onOver={card => card.setLevel(2)}
                    onOut={card => card.setLevel(1)}
                    key="-1">
                    <ReactQuill
                        placeholder={'오늘은 어떤정보를 공유할까요?'}
                        onChange={this.handleChange}
                        modules={HomeEditor.modules}
                        value={this.state.editorHtml}
                        formats={HomeEditor.formats}
                        onKeyUp={this.onKeyUp}
                    >
                        <div
                            key="editor"
                            ref="editor"
                            className="quill-contents"
                            dangerouslySetInnerHTML={{__html:this.state.editorHtml}}
                        />
                    </ReactQuill>
                    <ul className="completions">
                    </ul>
                    <div className="divider"></div>
                    <CustomToolbar onSend={this.send}/>
                </Card>
            </div>
        );
    }
}


HomeEditor.modules= {
    toolbar: {
        container: "#toolbar",
    },
    mentions: {
        container: '.completions',
        onClose: val => console.log("Closing: ", val),
        onOpen: () => console.log("Opening"),
        users: [
            {id: 1, name: 'Christy'},
            {id: 2, name: 'Micha'},
            {id: 3, name: 'Sima'},
            {id: 4, name: 'Coreen'},
            {id: 5, name: 'Aimee'},
            {id: 6, name: 'Brant'},
            {id: 7, name: 'Maryetta'},
            {id: 8, name: 'Nicol'},
            {id: 9, name: 'Thresa'},
            {id: 10, name: 'Pura'},
            {id: 11, name: 'Audie'},
            {id: 12, name: 'Jacob'},
            {id: 13, name: 'Mika'},
            {id: 14, name: 'Nubia'},
            {id: 15, name: 'Ana'},
            {id: 16, name: 'Sudie'},
            {id: 17, name: 'Raymundo'},
            {id: 18, name: 'Carolyne'},
            {id: 19, name: 'Doretha'},
            {id: 20, name: 'Milo'},
        ]
    }
};


HomeEditor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent','mention','mentions',
    'link', 'image', 'video'
];

export default HomeEditor;