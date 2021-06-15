import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { changeCount } from '../../store/actions/counts';

export const Register = (props) => {
    const { changePage } = props;
    const dispatch = useDispatch();
    const count = useSelector((state) => state.count.count);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <View>
            <Text>Регистрация</Text>
            <TextInput
                style={{ height: 40 }}
                placeholder="email"
                onChangeText={(email) => setEmail(email)}
                defaultValue={email}
                textContentType="emailAddress"
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="password"
                onChangeText={(pass) => setPassword(pass)}
                defaultValue={password}
                textContentType="password"
            />
            <TextInput
                style={{ height: 40 }}
                placeholder="confirm password"
                onChangeText={(pass) => setConfirmPassword(pass)}
                defaultValue={confirmPassword}
                textContentType="password"
            />
            <Button
                title="Регистрация"
                onPress={() => changePage('register')}
            />
            <Button title="Вход" onPress={() => changePage('login')} />
        </View>
    );
};
