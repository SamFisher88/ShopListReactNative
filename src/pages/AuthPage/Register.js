import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { register } from '../../store/actions/auth';

export const Register = (props) => {
    const { changePage, changeToken } = props;
    const dispatch = useDispatch();

    const errors = useSelector((state) => state.auth.registerErrors);
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
    const [confirmPassword, setConfirmPassword] = useState('');
    const [viewErrors, setViewErrors] = useState([]);

    const registerHandle = () => {
        setViewErrors([]);
        let err = [];
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (!reg.test(email)) {
            err.push('Введите действительный Email');
        }
        if (password !== confirmPassword) {
            err.push('Пароль и поддтверждение пароля не совпадают');
        }
        setViewErrors(err);

        if (err.length === 0) {
            dispatch(register(email, password, confirmPassword));
        }
    };

    return (
        <View style={styles.sectionContainer}>
            <View>
                <Text style={styles.sectionTitle}>Регистрация</Text>
                <TextInput
                    style={styles.inputElement}
                    placeholder='Email'
                    onChangeText={(email) => setEmail(email)}
                    defaultValue={email}
                    textContentType='emailAddress'
                />
                <TextInput
                    style={styles.inputElement}
                    placeholder='Пароль'
                    onChangeText={(pass) => setPassword(pass)}
                    defaultValue={password}
                    textContentType='password'
                />
                <TextInput
                    style={styles.inputElement}
                    placeholder='Подтверждение пароля'
                    onChangeText={(pass) => setConfirmPassword(pass)}
                    defaultValue={confirmPassword}
                    textContentType='password'
                />
                {viewErrors.length > 0 ? (
                    <View style={styles.sectionError}>
                        {viewErrors.map((item, index) => (
                            <Text key={index} style={styles.errorText}>
                                {item}
                            </Text>
                        ))}
                    </View>
                ) : null}
                {errors.length > 0 ? (
                    <View style={styles.sectionError}>
                        {errors.map((item, index) => (
                            <Text key={index} style={styles.errorText}>
                                {item}
                            </Text>
                        ))}
                    </View>
                ) : null}
                <Button
                    style={styles.loginButton}
                    title='Зарегистрироваться'
                    onPress={() => registerHandle()}
                />
            </View>

            <View style={styles.sectionFooter}>
                <Text
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Уже есть аккаунт?{' '}
                    <Text
                        style={{ color: '#3493eb', fontWeight: 'bold' }}
                        onPress={() => changePage('login')}
                    >
                        Вход
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
        marginBottom: 15,
    },
    errorText: {
        color: 'red',
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
