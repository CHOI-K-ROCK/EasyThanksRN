import React, { ReactElement, useState } from 'react';
import { SafeAreaView, Button, View } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import CustomText from 'components/common/CustomText';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import useDimensions from 'hooks/useDimensions';

const webci = '984264235813-20tpt93n8h48hjqirh9vd7mktoe08vq4.apps.googleusercontent.com'; // env

const GoogleTestScreen = (): ReactElement => {
    const { wp } = useDimensions();
    const [user, setUser] = useState<any>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<any>(null);

    // 로그인 과정에서만 GoogleSignin 이 사용되고, 이후에는 모두 firebase auth 로 모든게 이관된다고 생각하면 편함.

    const login = async () => {
        try {
            GoogleSignin.configure({ webClientId: webci });
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            await auth().signInWithCredential(googleCredential);
            const userData = auth().currentUser;

            setIsLoggedIn(true);
            setUser(userData);
        } catch (error) {
            setLoginError(error);
        }
    };
    const getProfile = async () => {
        try {
            const { displayName, photoURL } = auth().currentUser as FirebaseAuthTypes.User;
            setUser({ displayName, photoURL });
        } catch (error) {
            setLoginError(error);
        }
    };

    const logout = async () => {
        try {
            await auth().signOut();
            setUser(null);
        } catch (error) {
            setLoginError(error);
        }
    };

    const deleteUser = async () => {
        try {
            const userData = auth().currentUser;
            userData && userData.delete();
            setUser(null);
        } catch (error) {
            setLoginError(error);
        }
    }; // unlink

    return (
        <View style={{ alignItems: 'center', flex: 1, width: wp(100) }}>
            <CustomText>구글</CustomText>
            <Gap />
            <Gap />
            <Button title={'Login'} onPress={login} />
            <Gap />
            <Button title={'Logout'} onPress={logout} />
            <Gap />
            {isLoggedIn ? (
                <>
                    <Button title="Get Profile" onPress={getProfile} />
                    <Gap />
                </>
            ) : null}
            {isLoggedIn ? (
                <View>
                    <Button title="Delete User" onPress={deleteUser} />
                    <Gap />
                </View>
            ) : null}
            <Gap />
            {user && <ResponseJsonText name={'user'} json={user} />}
            {loginError && <ResponseJsonText name={'user'} json={loginError} />}
        </View>
    );
};

export default GoogleTestScreen;

const Gap = () => <View style={{ height: 20 }} />;
const ResponseJsonText = ({ name, json }: any) => (
    <CustomText>{name + ': ' + JSON.stringify(json)}</CustomText>
);
