import {
    AUTH_SET_CURRENTUSER,
    URL_AUTH,
    AUTH_SET_LOGIN_ERROR,
} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = (email, password) => {
    return async (dispatch) => {
        const data = { email, password };
        const result = await Http.post(
            URL_AUTH + 'api/auth/register/',
            false,
            data
        );
        let typeReducer = AUTH_SET_LOGIN_ERROR;
        let payload = [];

        if (result.type == 'ok') {
            await AsyncStorage.setItem(
                'accessToken',
                registerResult.access_token
            );
            typeReducer = AUTH_SET_CURRENTUSER;
            payload = result.user;
        } else if (result.type == 'error') {
            typeReducer = AUTH_SET_LOGIN_ERROR;
            payload = result.errors;
        }
        dispath({
            type: typeReducer,
            payload,
        });
    };
};
