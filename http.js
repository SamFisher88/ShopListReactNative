import AsyncStorage from '@react-native-async-storage/async-storage';

export class Http {
    static HEADERS = { 'Content-Type': 'application/json' };

    static async get(url, isSecure = false) {
        try {
            return await request(url, 'GET', isSecure);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async post(url, isSecure = false, data = {}) {
        try {
            return await request(url, 'POST', isSecure, data);
        } catch (e) {
            console.log(e);
        }
    }

    static async delete(url, isSecure = false) {
        try {
            return await request(url, 'DELETE', isSecure);
        } catch (e) {
            console.log(e);
        }
    }

    static async put(url, isSecure = false, data = {}) {
        try {
            return await request(url, 'PUT', isSecure, data);
        } catch (e) {
            console.log(e);
        }
    }
}

async function request(url, method = 'GET', isSecure = false, data) {
    if (isSecure) {
        Http.HEADERS.Authorization =
            'Bearer ' + AsyncStorage.getItem('accessToken');
    }
    const config = {
        method,
        headers: Http.HEADERS,
    };

    if (method === 'POST' || method === 'PUT') {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    return await response.json();
}
