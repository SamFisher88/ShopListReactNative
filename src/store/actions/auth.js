import {
    AUTH_SET_CURRENTUSER,
    URL_API,
    AUTH_SET_LOGIN_ERROR,
} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Http } from '../../../http';

export const login = (email, password) => {
    return async (dispath) => {
        const loginUser = { login: email, password };
        const result = await Http.post(
            URL_API + 'api/auth/login/',
            false,
            loginUser
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
