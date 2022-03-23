import {
    PROFILE_GET_MY,
    PROFILE_LOAD_DATA,
    PROFILE_UPDATE,
} from "../constants";

const initialState = {
    loading: true,
    myProfile: {},
    error: [],
};

const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case PROFILE_LOAD_DATA:
            return { ...state, loading: true };
        case PROFILE_GET_MY:
            return { ...state, loading: false, myProfile: payload };
        case PROFILE_UPDATE:
            if (payload.type != "ok") {
                return { ...state, loading: false, error: payload.message };
            }
            return { ...state, loading: false, myProfile: payload.result };
        default:
            return state;
    }
};

export default profileReducer;
