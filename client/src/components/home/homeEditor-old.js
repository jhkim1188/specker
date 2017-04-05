import React, { Component } from 'react';

import { EditorState, convertToRaw, RichUtils, ContentState } from 'draft-js';

import Editor,{composeDecorators} from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved
import createImagePlugin from 'draft-js-image-plugin';
// eslint-disable-next-line import/no-unresolved
import createAlignmentPlugin from 'draft-js-alignment-plugin';
// eslint-disable-next-line import/no-unresolved
import createFocusPlugin from 'draft-js-focus-plugin';
// eslint-disable-next-line import/no-unresolved
import createResizeablePlugin from 'draft-js-resizeable-plugin';
// eslint-disable-next-line import/no-unresolved
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
// eslint-disable-next-line import/no-unresolved
// import createDragNDropUploadPlugin from 'draft-js-drag-n-drop-upload-plugin';
import createVideoPlugin from 'draft-js-video-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import ImageAdd from './imageAdd';
import VideoAdd from './videoAdd';

import { fromJS } from 'immutable';
import { SERVER_URL } from '../../config';

import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';
import 'draft-js-alignment-plugin/lib/plugin.css';
import 'draft-js-image-plugin/lib/plugin.css';
import 'draft-js-focus-plugin/lib/plugin.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css'


import '../../styles/mentionStyles.css';
import Card from 'react-material-card';


import {
    ItalicButton,
    BoldButton,
    UnderlineButton,
    CodeButton,
    HeadlineOneButton,
    HeadlineTwoButton,
    HeadlineThreeButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
} from 'draft-js-buttons'; // eslint-disable-line import/no-unresolved
const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
        BoldButton,
        ItalicButton,
        UnderlineButton,
        CodeButton,
        Separator,
        HeadlineOneButton,
        HeadlineTwoButton,
        HeadlineThreeButton,
        UnorderedListButton,
        OrderedListButton,
        BlockquoteButton,
        CodeBlockButton,
    ]
});
const { InlineToolbar } = inlineToolbarPlugin;


const linkifyPlugin = createLinkifyPlugin();


const tags = fromJS([
    {
        name: 'Jyoti Puri',
        link: 'https://twitter.com/jyopur',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
        name: 'Max Stoiber',
        link: 'https://twitter.com/mxstbr',
        avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
        name: 'Nik Graf',
        link: 'https://twitter.com/nikgraf',
        avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
        name: 'Pascal Brandt',
        link: 'https://twitter.com/psbrandt',
        avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
]);

const mentions = fromJS([
    {
        name: '전상현',
        link: 'https://twitter.com/mrussell247',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: '이천지',
        link: 'https://twitter.com/juliandoesstuff',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },

]);


const PersonMentionPlugin = createMentionPlugin({
    mentions,
    entityMutability: 'IMMUTABLE',
    mentionTrigger:'@',
    mentionPrefix: '@',
    mentionComponent:(props) => (

        <span
            className={"mention"}
            // eslint-disable-next-line no-alert
            onClick={() => alert('Clicked on the Mention!')}
        >
      {props.decoratedText}
    </span>
    ),

});

const TagMentionPlugin = createMentionPlugin({
    tags,
    entityMutability: 'IMMUTABLE',
    mentionTrigger:'#',
    mentionPrefix: '#',
    mentionComponent:(props) => {
        console.log(props.mention._root.entries[2][1]);
        return(
        <span
            className={"tag"}
            value={props.mention._root.entries[2][1]}
            // eslint-disable-next-line no-alert
            onClick={() => alert('Clicked on the Mention!')}
        >
      {props.decoratedText}
    </span>
    )}

});

const { MentionSuggestions } = PersonMentionPlugin;
const TagMentionSuggestions = TagMentionPlugin.MentionSuggestions;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;
const focusPlugin = createFocusPlugin();
const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    resizeablePlugin.decorator,
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    blockDndPlugin.decorator
);

const videoPlugin = createVideoPlugin({ decorator });
// const { types } = videoPlugin;

const imagePlugin = createImagePlugin({ decorator });

// const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
//     handleUpload: mockUpload,
//     addImage: imagePlugin.addImage,
// });




const plugins = [
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin,
    videoPlugin,
    linkifyPlugin,
    PersonMentionPlugin,
    TagMentionPlugin,
    emojiPlugin,
    inlineToolbarPlugin
];



const MentionEntry = (props) => {
    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <img
                        src={mention.get('avatar')}
                        className="mentionSuggestionsEntryAvatar"
                        role="presentation"
                    />
                </div>
                <div className="mentionSuggestionsEntryContainerRight">
                    <div className="mentionSuggestionsEntryText">
                        {mention.get('name')}
                    </div>

                    <div className="mentionSuggestionsEntryTitle">
                        {mention.get('title')}
                    </div>
                </div>
            </div>
        </div>
    );
};

const TagEntry = (props) => {

    const {
        mention,
        theme,
        searchValue, // eslint-disable-line no-unused-vars
        ...parentProps
    } = props;

    return (
        <div {...parentProps}>
            <div className="mentionSuggestionsEntryContainer">
                <div className="mentionSuggestionsEntryContainerLeft">
                    <img
                        src={mention.get('thumb')}
                        className="mentionSuggestionsEntryAvatar"
                        role="presentation"
                    />
                </div>
                <div className="mentionSuggestionsEntryContainerRight">
                    <div className="mentionSuggestionsEntryText">
                        {mention.get('name')}
                    </div>

                    <div className="mentionSuggestionsEntryTitle">
                        {mention.get('like')}명이 좋아하고 있습니다.
                    </div>

                    <div className="mentionSuggestionsEntryId">
                        {mention.get('_id')}
                    </div>
                </div>
            </div>
        </div>
    );
};



class HomeEditor extends Component{


    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            tagSuggestions: fromJS([]),
            mentionSuggestions:fromJS([])
        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.onTab = (e) => this._onTab(e);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);

    }

    focus = () => {
        this.editor.focus();
    };

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _onTab(e) {
        const maxDepth = 4;
        this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }


    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onMentionSearchChange = ({ value }) => {
        require('whatwg-fetch');

        fetch(`${SERVER_URL}/getMentions`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                keyword:value
            })
        }).then((response) => response.json())
            .then((data) => {

                this.setState({
                    mentionSuggestions: fromJS(data),
                });
            });
    };

    onTagSearchChange = ({ value }) => {
        require('whatwg-fetch');
        fetch(`${SERVER_URL}/getTags`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }, body: JSON.stringify({
                keyword:value
            })
        }).then((response) => response.json())
            .then((data) => {
            console.log(data);
                this.setState({
                    tagSuggestions: fromJS(data),
                });
            });
    };

    onAddMention = () => {
        // get the mention object selected
    };
    onAddTag = () => {
        // get the mention object selected
    };
    post(){
        let rawHtmlArray = convertToRaw(this.state.editorState.getCurrentContent()).blocks;
        var checked = false;
        for(let i=0; i<rawHtmlArray.length; i++){
            if(rawHtmlArray[i].text.trim()!=""){
                checked=true;
            }
        }
        if(!checked){
            alert("내용을 입력해 주세요.");
        }
        else {
            if(confirm('글을 등록 하시겠습니까?')){
                var markup = document.documentElement.getElementsByClassName('DraftEditor-editorContainer')[0].outerHTML;
                // this.props.saveHomeFeed(markup, this.state.title);
                const context = JSON.stringify(this.state.editorState.getCurrentContent());

                this.props.onSend({markup, context });
                const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
                this.setState({editorState})
            }



        }

    }
    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

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

                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        onClick={this.focus}
                        customStyleMap={styleMap}
                        onTab={this.onTab}
                        spellCheck={false}
                        handleKeyCommand={this.handleKeyCommand}
                        blockStyleFn={getBlockStyle}
                        ref={(element) => {
                            this.editor = element;
                        }}
                    />

                    <InlineToolbar />
                    <AlignmentTool />

                    <InlineStyleControls
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                        onPost={this.post.bind(this)}
                    />
                    <ImageAdd
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    modifier={imagePlugin.addImage}
                />
                    <VideoAdd
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        modifier={videoPlugin.addVideo}
                    />
                    <TagMentionSuggestions
                        onSearchChange={this.onTagSearchChange}
                        suggestions={this.state.tagSuggestions}
                        onAddMention={this.onAddTag}
                        entryComponent={TagEntry}
                    />

                    <MentionSuggestions
                        onSearchChange={this.onMentionSearchChange}
                        suggestions={this.state.mentionSuggestions}
                        onAddMention={this.onAddMention}
                        entryComponent={MentionEntry}
                    />

                    <EmojiSuggestions />

                </Card>
            </div>
        );
    }
}




const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};



function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}




class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}

const styles = {

    postBtn:{
        textDecoration: 'none !important'
    }


};


const InlineStyleControls = (props) => {
    let currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
             <span className="RichEditor-styleButton" style={styles.button} onClick={props.onUploadImage}>
                    <div style={styles.postBtn}>
                         사진
                    </div>
            </span>
            <span className="RichEditor-styleButton" style={styles.button} onClick={props.onUploadImage}>
                    <div style={styles.postBtn}>
                         동영상
                    </div>
            </span>
            <span className="RichEditor-styleButton" style={styles.button} onClick={props.onPost}>
                    <div style={styles.postBtn}>
                        올리기
                    </div>
            </span>

        </div>
    );
};


export default HomeEditor;