import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { changeCount } from '../store/actions/counts';
import { HeaderBackground, HeaderTitle } from '@react-navigation/stack';

export const MainPage = () => {
    return (
        <View>
            <Text>This is main page</Text>
        </View>
    );
};
