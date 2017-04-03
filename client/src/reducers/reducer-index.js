import { CHANGE_SIDEBAR_STATE } from '../actions/types';

const INITIAL_STATE = { sidebarState: false};

export default function(state = INITIAL_STATE, action) {

    switch(action.type) {
        case CHANGE_SIDEBAR_STATE:
            return { ...state, sidebarState: action.payload};


    }

    return state;
}
