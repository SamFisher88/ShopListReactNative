import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getMyProfile } from '../store/actions/profile';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.profile.myProfile);
    const user = useSelector((state) => state.auth.currentUser);

    useEffect(() => {
        async function loadResourcesAndData() {
            dispatch(getMyProfile());
        }

        loadResourcesAndData();
    }, []);

    return (
        <View>
            <TextInput
                placeholder='Email'
                textContentType='emailAddress'
                value={user.username}
                editable={false}
            />
            <TextInput
                placeholder='Nickname'
                textContentType='nickname'
                value={profile?.nickname}
            />
            <TextInput
                placeholder='Имя'
                textContentType='name'
                value={profile?.name}
            />
            <TextInput
                placeholder='О себе'
                value={profile?.aboutUser}
                multiline={true}
                numberOfLines={3}
                style={{ textAlignVertical: 'top' }}
            />
            <Button title='Сохранить' />
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({});
