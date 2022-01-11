import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { login } from '../../store/actions/auth';

export const Login = (props) => {
    const { changePage, changeToken } = props;
    const dispatch = useDispatch();

    const errors = useSelector((state) => state.auth.loginErrors);
    const user = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        async function loadResourcesAndData() {
            if (Object.keys(user).length !== 0) {
                changeToken(user.access_token);
            }
        }

        loadResourcesAndData();
    }, [user]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginHandle = () => {
        dispatch(login(email, password));
    };

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionLogin}>
                <Text style={styles.sectionTitle}>Вход</Text>
                <TextInput
                    style={styles.inputElement}
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    defaultValue={email}
                    textContentType="emailAddress"
                />
                <TextInput
                    style={styles.inputElement}
                    placeholder="Пароль"
                    onChangeText={(pass) => setPassword(pass)}
                    defaultValue={password}
                    textContentType="password"
                    secureTextEntry={true}
                />
                {errors.length > 0
                    ? errors.map((item) => (
                          <Text style={styles.sectionError}>{item}</Text>
                      ))
                    : null}

                <Button
                    style={styles.loginButton}
                    title="Войти"
                    onPress={() => loginHandle()}
                />
            </View>
            <View style={styles.sectionFooter}>
                <Text
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Нет аккаунта?{' '}
                    <Text
                        style={{ color: '#3493eb', fontWeight: 'bold' }}
                        onPress={() => changePage('register')}
                    >
                        Регистрация
                    </Text>
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-around',
    },
    sectionLogin: {},
    sectionFooter: {
        justifyContent: 'flex-end',
    },
    sectionTitle: {
        fontSize: 32,
        fontWeight: '600',
        marginBottom: 30,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    sectionError: {
        color: 'red',
        marginBottom: 15,
    },
    highlight: {
        fontWeight: '700',
    },
    inputElement: {
        borderWidth: 1,
        borderColor: '#20232a',
        borderRadius: 6,
        height: 40,
        marginBottom: 15,
        paddingLeft: 15,
    },
    loginButton: {
        marginBottom: 50,
        color: '#333',
    },
});
