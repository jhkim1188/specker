import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTag } from '../../actions/index';


class TagSuggest extends Component{
    constructor (props) {
        super(props);

        this.state={
            tags:[],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(keyword){
        this.props.getTag(keyword, ()=>{
            let processedTagData = this.props.tagData;

            for(let i=0; i<this.state.tags.length; i++){
                for(let j=0; j<processedTagData.length; j++){

                    if(this.state.tags[i].text == processedTagData[j]) {

                        processedTagData.splice(j, 1);
                        break;
                    }

                }
            }

            this.setState({
                suggestions:processedTagData
            });
        });

    }



    handleDelete(i) {

        let tags = this.state.tags;
        let suggestions = this.state.suggestions;
        tags.splice(i, 1);
        this.setState({tags: tags, suggestions: suggestions});

    }

    handleAddition(tag) {

        let tags = this.state.tags;
        tags.push({
            id: tags.length + 1,
            text: tag
        });
        this.setState({tags: tags});
        this.props.input.onChange(tags);
    }

    shouldComponentUpdate(nextProps, nextState){
        return true;
    }

    render() {
        let tags = this.state.tags;
        // let suggestions = this.props.tagData;
        // let searchProcessedData = [];
        // if(suggestions) {
        //     suggestions.map(function (result) {
        //         searchProcessedData.push(result.name);
        //     });
        // }
        // console.log("render", searchProcessedData, tags);
        return (
            <div>
                <ReactTags tags={tags}
                           suggestions={this.state.suggestions}
                           handleDelete={this.handleDelete}
                           handleAddition={this.handleAddition}
                           handleInputChange={this.handleInputChange}
                           autocomplete={true}
                           minQueryLength={1}
                           autofocus={false}/>
            </div>
        )
    }
}



function mapStateToProps(state){
    return { tagData: state.tag.tagData };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ getTag }, dispatch);
}




export default connect(mapStateToProps, mapDispatchToProps)(TagSuggest);
