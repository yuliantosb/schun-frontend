
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import testReducer from './testReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    test: testReducer,
});

export default rootReducer;