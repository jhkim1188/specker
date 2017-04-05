import { CHANGE_SIDEBAR_STATE, CHANGE_MODAL_STATE, AUTH_USER, AUTH_ERROR, UN_AUTH_USER, GET_TAG, SIGN_UP, SIGN_IN, FALSE_PASSWORD,
    SEND_HOME_FEED } from './types';
import axios from 'axios';
import { SERVER_URL } from '../config';
import { push } from 'connected-react-router'


export function changeSidebarState(state){
    return function(dispatch){
        dispatch({
            type:CHANGE_SIDEBAR_STATE,
            payload:state
        });
    }
}

export function changeModalState(state){
    return function(dispatch){
        dispatch({
            type:CHANGE_MODAL_STATE,
            payload:state
        })
    }
}



export function signinUser(email, password ) {
    return function(dispatch) {
        // Submit email/password to the server
        // console.log(email, password);
        // axios.post(`${SERVER_URL}/signin`, { email, password })
        //     .then(response => {
        //         const userStatus = response.data.userStatus;
        //         if(userStatus==SIGN_UP_INCOMPLETE_USER){
        //             dispatch({ type: SIGN_UP_INCOMPLETE_USER });
        //         }
        //         else{
        //             localStorage.setItem('token', response.data.token);
        //             localStorage.setItem('status', response.data.userStatus);
        //             dispatch({ type:  AUTH_USER });
        //             browserHistory.push('/');
        //         }
        //
        //     })
        //     .catch(response => {
        //         dispatch({ type:  UN_AUTH_USER });
        //     });
    }
}

export function signOut() {
    localStorage.removeItem('token');
    return {
        type: UN_AUTH_USER
    }
}



export function getTag(keyword, callback) {
    return function (dispatch) {
        axios.post(`${SERVER_URL}/getTag`,{keyword:keyword})
            .then(response => {
                dispatch({
                    type: GET_TAG,
                    payload: response.data
                });
                callback();
            })
            .catch(response => {

            });
    }
}

export function signIn(value, f, o){

    return function (dispatch) {

        axios.post(`${SERVER_URL}/signIn`, value)
            .then(response => {

                if(response.data.result == UN_AUTH_USER){
                    o.submit();
                } else if(response.data.result == FALSE_PASSWORD){
                    dispatch({ type: response.data.result});
                } else{
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('status', response.data.result);
                    dispatch({ type: response.data.result, user:response.data.user});
                    dispatch(push('/'))

                }

            })
            .catch(response => {
                dispatch(authError(response.response.data.error))
            });
    }
}

export function signUp(value) {
    return function(dispatch) {
        axios.post(`${SERVER_URL}/signUp`, value)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('status', response.data.result);
                dispatch({ type: response.data.result, user:response.data.user});
                dispatch(push('/'))

            })
            .catch(response => {
                dispatch(authError(response.response.data.error))
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function sendHomeFeed(html, context){
    return function(dispatch){

        axios.post(`${SERVER_URL}/sendHomeFeed`, {html:html, context:context},{
            headers: { 'authorization': localStorage.getItem('token'),}
        }).then(response => {
            // dispatch(push('/'));
            window.location.reload(true);
        });
    }
}