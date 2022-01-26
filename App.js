/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Provider } from 'react-redux';
import store from './src/store';

import { MainPage } from './src/pages/MainPage';
import ProfilePage from './src/pages/ProfilePage';
import { AuthPage } from './src/pages/AuthPage';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                {/*Donute Button Image */}
                <Image
                    source={require('./src/images/drawerWhite.png')}
                    style={{
                        width: 25,
                        height: 25,
                        marginLeft: 5,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

function myListScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='MyLists'>
            <Stack.Screen
                name='MyLists'
                component={MainPage}
                options={{
                    title: 'Списки покупок', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

function profileScreenStack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen
                name='Profile'
                component={ProfilePage}
                options={{
                    title: 'Профиль', //Set Header Title
                    headerLeft: () => (
                        <NavigationDrawerStructure
                            navigationProps={navigation}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: '#f4511e', //Set Header color
                    },
                    headerTintColor: '#fff', //Set Header text color
                    headerTitleStyle: {
                        fontWeight: 'bold', //Set Header text style
                    },
                }}
            />
        </Stack.Navigator>
    );
}

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
            {accToken != undefined && accToken != null ? (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName='MyLists'>
                        <Drawer.Screen
                            name='MyLists'
                            component={myListScreenStack}
                            options={{ drawerLabel: 'Списки покупок' }}
                        />
                        <Drawer.Screen
                            name='Profile'
                            component={profileScreenStack}
                            options={{ drawerLabel: 'Профиль' }}
                        />
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <AuthPage changeToken={setAccToken} />
            )}
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
