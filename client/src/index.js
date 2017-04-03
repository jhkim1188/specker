import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import App from './App';
import './index.css';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { connectRouter, routerMiddleware, push } from 'connected-react-router'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { AUTH_USER, UN_AUTH_USER } from './actions/types';
import { SERVER_URL } from './config'
import axios from 'axios';

const history = createBrowserHistory();
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
            thunk
        ),
    ),
);

const token = localStorage.getItem('token');
const status = localStorage.getItem('status');


if (token && status==AUTH_USER) {

    axios.post(`${SERVER_URL}/autoSignIn`, {}, {
        headers: { 'authorization': token,
            'Content-Type': 'application/json'}
    }).then(response => {
        store.dispatch({ type: response.data.result, user:response.data.user});
        store.dispatch(push('/'))

        })
        .catch(response => {
        });

} else{
    console.log("or this??");
    store.dispatch({type: UN_AUTH_USER});

    localStorage.setItem('status', UN_AUTH_USER);
    store.dispatch(push('/signin'));
    //추후에 이부분에서 로직 처리가 필요.. 여기서 바로 TAG_INCOMPLETE_USER를 넣을게 아니라, 서버를 통해 확인해야함. status만 지워진 경우가 있음.
}





const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
};
render();
// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./App', () => {
        render()
    });

    // Reload reducers
    module.hot.accept('./reducers', () => {
        store.replaceReducer(connectRouter(history)(rootReducer))
    })
}
