import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import countReducer from './reducers/countReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({ count: countReducer, auth: authReducer });
export default createStore(rootReducer, applyMiddleware(thunk));
