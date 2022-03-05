import { Http } from '../../../http';
import { PROFILE_GET_MY, URL_API } from '../constants';

export const getMyProfile = () => {
    return async (dispath) => {
        const result = await Http.get(URL_API + 'api/profiles/my', true);
        console.log('MyProfile', result);
        dispath({
            type: PROFILE_GET_MY,
            payload: result,
        });
    };
};
