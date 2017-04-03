import { GET_TAG } from '../actions/types';


const INITIAL_STATE = {tagData:[]};
export default function(state = INITIAL_STATE, action){
    switch (action.type){
        case GET_TAG:
            return {...state, tagData:action.payload};

        default:
            return state;
    }
}