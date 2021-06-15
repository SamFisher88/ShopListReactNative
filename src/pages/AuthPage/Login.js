import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { login } from '../../store/actions/auth';

export const Login = (props) => {
    const { changePage } = props;
    const dispatch = useDispatch();

    const errors = useSelector((state) => state.auth.loginErrors);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandle = () => {
        dispatch(login(email, password));
    };

    return (
        <View>
            <Text>Вход</Text>
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
                secureTextEntry={true}
            />
            {errors.length > 0
                ? errors.map((item) => <Text>{item}</Text>)
                : null}
            <Button title="Вход" onPress={() => loginHandle()} />
            <Button
                title="Регистрация"
                onPress={() => changePage('register')}
            />
        </View>
    );
};
