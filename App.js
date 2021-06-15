/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Provider } from 'react-redux';
import store from './src/store';

import { MainPage } from './src/pages/MainPage';
import { AuthPage } from './src/pages/AuthPage';

const App = () => {
    const [accToken, setAccToken] = React.useState(false);
    React.useEffect(() => {
        async function loadResourcesAndData() {
            const acctkn = await AsyncStorage.getItem('accessToken');
            setAccToken(acctkn);
        }

        loadResourcesAndData();
    }, []);

    return (
        <Provider store={store}>
            <View styles={styles.container}>
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
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
