import { Http } from "../../../http";
import {
    PROFILE_GET_MY,
    PROFILE_LOAD_DATA,
    PROFILE_UPDATE,
    URL_API,
} from "../constants";

export const getMyProfile = () => {
    return async (dispath) => {
        dispath({ type: PROFILE_LOAD_DATA });
        const result = await Http.get(URL_API + "api/profiles/my", true);
        console.log("MyProfile", result);
        dispath({
            type: PROFILE_GET_MY,
            payload: result,
        });
    };
};

export const updateProfile = (profile) => {
    return async (dispath) => {
        dispath({ type: PROFILE_LOAD_DATA });
        console.log("profile", profile);
        const result = await Http.put(URL_API + "api/profiles", true, profile);
        console.log("ProfileUpdate", result);
        dispath({
            type: PROFILE_UPDATE,
            payload: result,
        });
    };
};
