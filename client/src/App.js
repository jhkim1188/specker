import React, { PropTypes, Component } from 'react'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'

class App extends Component{
    render(){
        return (
            <div className="App">
                <ConnectedRouter history={this.props.history}>
                    { routes }
                </ConnectedRouter>
            </div>

        )
    }
}

App.propTypes = {
    history: PropTypes.object,
};

export default App