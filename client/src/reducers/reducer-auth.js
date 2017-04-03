import { AUTH_USER, UN_AUTH_USER, AUTH_ERROR, FALSE_PASSWORD } from '../actions/types';


const INITIAL_STATE = { isUser: false, modalState:true, user:{}};
export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case AUTH_USER:
            console.log("log in!");
            return { ...state, isUser:true, modalState:false, user:action.user };
        case UN_AUTH_USER:
            return { ...state, isUser:false };
        case FALSE_PASSWORD:
            return { ...state, error: '비밀번호가 다릅니다.',isUser:false };
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        default:
            return {...state, error:null}

    }
}
