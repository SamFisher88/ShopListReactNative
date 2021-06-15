import { createStore, combineReducers } from 'redux';
import countReducer from './reducers/countReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({ count: countReducer, auth: authReducer });
export default createStore(rootReducer);
