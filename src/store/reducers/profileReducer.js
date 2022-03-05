import { PROFILE_GET_MY } from '../constants';

const initialState = {
    myProfile: {},
};

const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_GET_MY:
            return { ...state, myProfile: payload };

        default:
            return state;
    }
};

export default profileReducer;
