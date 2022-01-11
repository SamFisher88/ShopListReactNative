import React, { useState } from 'react';
import { Login } from './AuthPage/Login';
import { Register } from './AuthPage/Register';
import { View } from 'react-native';

export const AuthPage = (props) => {
    const { changeToken } = props;
    const [page, setPage] = useState('login');

    return (
        <View style={{ flex: 1 }}>
            {page === 'login' ? (
                <Login changePage={setPage} changeToken={changeToken} />
            ) : (
                <Register changePage={setPage} changeToken={changeToken} />
            )}
        </View>
    );
};
