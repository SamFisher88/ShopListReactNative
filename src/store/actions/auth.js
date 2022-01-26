import {
    AUTH_SET_CURRENTUSER,
    URL_API,
    AUTH_SET_LOGIN_ERROR,
    AUTH_SET_REGISTER_ERROR,
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
        console.log('loginResult', result);
        let typeReducer = AUTH_SET_LOGIN_ERROR;
        let payload = [];

        if (result.type == 'ok') {
            await AsyncStorage.setItem('accessToken', result.user.access_token);
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

export const register = (email, password, confirmPassword) => {
    return async (dispath) => {
        const registerUser = { email, password, confirmPassword };
        const result = await Http.post(
            URL_API + 'api/auth/register/',
            false,
            registerUser
        );
        console.log('registerResult', result);
        let typeReducer = AUTH_SET_REGISTER_ERROR;
        let payload = [];

        if (result.type == 'ok') {
            await AsyncStorage.setItem('accessToken', result.user.access_token);
            typeReducer = AUTH_SET_CURRENTUSER;
            payload = result.user;
        } else if (result.type == 'error') {
            typeReducer = AUTH_SET_REGISTER_ERROR;
            payload = result.errors;
        }
        dispath({
            type: typeReducer,
            payload,
        });
    };
};
