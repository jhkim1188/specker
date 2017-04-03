import React, { Component } from 'react';
const Masonry = require('react-masonry-component');
import InfiniteScroll from 'react-infinite-scroller';

import axios from 'axios';

import HomeCard from '../../components/home/homeCard';
import HomeEditor from '../../components/home/homeEditor';
import { bindActionCreators } from 'redux';
import { sendHomeFeed } from '../../actions/index';
import { connect } from 'react-redux';
import { SERVER_URL } from '../../config';




let masonryOptions = {
    transitionDuration: 0
};

class HomeLeftPanel extends Component{

    constructor(props) {
        super(props);

        this.state = {
            feeds: [],
            hasMoreItems: true,
            nextIndex: "",
        };
    }


    loadItems(page) {
        var self = this;

        axios.post(`${SERVER_URL}/getHomeFeed`, {nextIndex:this.state.nextIndex},{
            headers: { 'authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json'}
        }).then(response => {
            var feeds = self.state.feeds;
            response.data.data.map((feed)=>{
                feeds.push(feed);
            });
            if(response.data.nextIndex){
                self.setState({
                    feeds:feeds,
                    nextIndex:response.data.nextIndex
                });
            } else {
                self.setState({
                    hasMoreItems:false
                })
            }
        });

    }
    handleLayoutComplete() {
        console.log("hoh!");
    }
    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render(){

        const loader = <img src="/loader.gif" width="20%" height="auto" className="loader" />;

        var items = [];
        this.state.feeds.map((feed, i) => {
            items.push(
                <HomeCard key={i} thumb={feed.user.gravatar} content={feed.content}/>
            );
        });

        return(
          <div id="left-panel">
              <Masonry

                  className={'my-gallery-class'} // default ''
                  elementType={'ul'} // default 'div'
                  options={masonryOptions} // default {}
                  disableImagesLoaded={false} // default false
                  updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
              >
                  <InfiniteScroll
                      className="homeContent"
                      pageStart={0}
                      loadMore={this.loadItems.bind(this)}
                      hasMore={this.state.hasMoreItems}
                      loader={loader}>

                      <div>
                          <HomeEditor user={this.props.user} onSend={this.props.sendHomeFeed} />
                          {items}
                      </div>
                  </InfiniteScroll>
              </Masonry>

          </div>
        );
    }
}



function mapStateToProps(state){
    return {modalState:state.auth.modalState, user:state.auth.user};
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ sendHomeFeed }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeLeftPanel);
