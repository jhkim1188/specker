import React, { Component } from 'react';

import { EditorState, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createHashtagPlugin from 'draft-js-hashtag-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createEmojiPlugin from 'draft-js-emoji-plugin'; // eslint-disable-line import/no-unresolved
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin'; // eslint-disable-line import/no-unresolved

import Hangul from 'hangul-js';

import {stateToHTML} from 'draft-js-export-html';
import { fromJS } from 'immutable';


import 'draft-js-hashtag-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import 'draft-js-emoji-plugin/lib/plugin.css';

import '../../styles/mentionStyles.css';
import Card from 'react-material-card';

const hashtagPlugin = createHashtagPlugin();
const linkifyPlugin = createLinkifyPlugin();

const PersonMentionPlugin = createMentionPlugin({
    mentions,
    entityMutability: 'IMMUTABLE',
    mentionTrigger:'@',
    mentionPrefix: '@',
    mentionComponent:(props) => (

        <span
            className="hello"
            // eslint-disable-next-line no-alert
            onClick={() => console.log(props)}
        >
      {props.decoratedText}
    </span>
    ),

});

const TagMentionPlugin = createMentionPlugin({
    mentions,
    entityMutability: 'IMMUTABLE',
    mentionTrigger:'#',
    mentionPrefix: '#',

});

const { MentionSuggestions } = PersonMentionPlugin;
const TagMentionSuggestions = TagMentionPlugin.MentionSuggestions;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions } = emojiPlugin;

const plugins = [

    linkifyPlugin,
    PersonMentionPlugin,
    TagMentionPlugin,
    emojiPlugin
];

let options = {
    inlineStyles: {
        // Override default element (`strong`).
        BOLD: {element: 'span'},
        ITALIC: {
            // Add custom attributes. You can also use React-style `className`.
            attributes: {class: 'foo'},
            // Use camel-case. Units (`px`) will be added where necessary.
            style: {fontSize: 12}
        },
        // Use a custom inline style. Default element is `span`.
        RED: {style: {color: '#900'}},
        SPAN:{
            attributes: {class: 'las'},
            style: {fontSize: 100}
        }
    },
    blockRenderers: {
        unstyled: (block) => {
            let data = block.getData();
            return '<div>' + block.getText() + '</div>';

        },
    },
};

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


const Entry = (props) => {
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




class HomeEditor extends Component{


    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: mentions,
        };
    }


    onChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onSearchChange = ({ value }) => {

        const searchResult =[];
        this.state.suggestions.map(function(i){
            searchResult.push(i._root.entries[0][1]);
        });

        // console.log("searchResult",searchResult);
        const searcher = new Hangul.Searcher(value);

        searchResult.map(function (i) {

            // console.log("i", i, searcher.search(i), value);
            if(searcher.search(i)==0){
                // console.log("het!",i);
            }
        });


        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    onAddMention = () => {
        // get the mention object selected
    }

    focus = () => {
        this.editor.focus();
    };




    render() {
        return (

            <div className="homeEditor">
                <div className="thumb">
                    <img />
                </div>
                <Card
                    style={{ marginTop: 20}}
                    borderRadius={3}
                    onOver={card => card.setLevel(2)}
                    onOut={card => card.setLevel(1)}
                    key="-1">
                    <div className="row card-title">
                        <div className="col-xs-2 card-title-author-wrapper">
                            <a className="card-title-author">sanghyun</a>
                        </div>
                        <div className="col-xs-10 card-title-text-wrapper">
                            <a className="card-title-text">hello</a>
                        </div>

                    </div>
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        plugins={plugins}
                        ref={(element) => { this.editor = element; }}
                    />


                    <TagMentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}
                        entryComponent={Entry}
                    />

                    <MentionSuggestions
                        onSearchChange={this.onSearchChange}
                        suggestions={this.state.suggestions}
                        onAddMention={this.onAddMention}

                        entryComponent={Entry}
                    />
                    <EmojiSuggestions />
                    <div className="feed-content">
                        <a onClick={()=>{
                            console.log(convertToRaw(this.state.editorState.getCurrentContent()));
                            console.log(stateToHTML(this.state.editorState.getCurrentContent()));
                        }} className="home-feed-more">
                            더보기
                        </a>
                    </div>
                </Card>
            </div>
        );
    }
}

export default HomeEditor;