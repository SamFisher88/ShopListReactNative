import { AUTH_SET_CURRENTUSER, AUTH_SET_LOGIN_ERROR } from '../constants';

const initialState = {
    currentUser: {},
    loginErrors: [],
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_CURRENTUSER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case AUTH_SET_LOGIN_ERROR:
            return {
                ...state,
                loginErrors: action.payload,
            };
        default:
            return state;
    }
};
export default authReducer;
