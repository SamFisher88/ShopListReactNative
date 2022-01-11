/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import store from './src/store';

import { MainPage } from './src/pages/MainPage';
import { AuthPage } from './src/pages/AuthPage';

const App = () => {
    const [accToken, setAccToken] = useState(false);
    useEffect(() => {
        async function loadResourcesAndData() {
            const acctkn = await AsyncStorage.getItem('accessToken');
            setAccToken(acctkn);
        }

        loadResourcesAndData();
    }, []);

    return (
        <Provider store={store}>
            <View style={styles.sectionContainer}>
                {accToken != undefined && accToken != null ? (
                    <MainPage />
                ) : (
                    <AuthPage changeToken={setAccToken} />
                )}
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
        flex: 1,
    },
});

export default App;
