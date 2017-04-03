import { combineReducers } from 'redux'
import counterReducer from './counter'
import { reducer as reduxFormReducer } from 'redux-form'
import ReducerIndex from './reducer-index';
import ReducerAuth from './reducer-auth';
import ReducerTag from './reducer-tag';


const rootReducer = combineReducers({
    count: counterReducer,
    index: ReducerIndex,
    auth: ReducerAuth,
    tag: ReducerTag,
    form: reduxFormReducer,

});

export default rootReducer;
