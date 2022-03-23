import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getMyProfile, updateProfile } from "../store/actions/profile";

const ProfilePage = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.profile.loading);
    const profile = useSelector((state) => state.profile.myProfile);

    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [userName, setUserName] = useState("");
    const [aboutUser, setAboutUser] = useState("");

    useEffect(() => {
        async function loadResourcesAndData() {
            dispatch(getMyProfile());
            setEmail(await AsyncStorage.getItem("userName"));
        }

        loadResourcesAndData();
    }, []);

    useEffect(() => {
        async function loadResourcesAndData() {
            setNickname(profile?.nickname);
            setUserName(profile?.userName);
            setAboutUser(profile?.aboutUser);
        }

        loadResourcesAndData();
    }, [loading]);

    const saveProfile = () => {
        dispatch(
            updateProfile({
                nickname,
                userName,
                aboutUser,
                id: profile.id,
                userId: profile.userId,
            })
        );
    };

    const updateNickname = (val) => {
        profile.nickname = val;
    };
    console.log("loading", loading);
    return (
        <View>
            {!loading ? (
                <>
                    <TextInput
                        placeholder='Email'
                        textContentType='emailAddress'
                        value={email}
                        editable={false}
                    />
                    <TextInput
                        placeholder='Nickname'
                        textContentType='nickname'
                        value={nickname}
                        onChangeText={(e) => setNickname(e)}
                    />
                    <TextInput
                        placeholder='Имя'
                        textContentType='name'
                        value={userName}
                        onChangeText={(e) => setUserName(e)}
                    />
                    <TextInput
                        placeholder='О себе'
                        value={aboutUser}
                        onChangeText={(e) => setAboutUser(e)}
                        multiline={true}
                        numberOfLines={3}
                        style={{ textAlignVertical: "top" }}
                    />
                    <Button title='Сохранить' onPress={saveProfile} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

export default ProfilePage;

const styles = StyleSheet.create({});
