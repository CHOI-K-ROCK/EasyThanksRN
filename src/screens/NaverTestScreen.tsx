import NaverLogin, {
    NaverLoginResponse,
    GetProfileResponse,
} from '@react-native-seoul/naver-login';
import React, { ReactElement, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, Button, View } from 'react-native';
import CustomText from '../components/common/CustomText';
import useDimensions from '../hooks/useDimensions';

/** Fill your keys */
const consumerKey = 'ppND6ldhXb7KNVFZy35e';
const consumerSecret = 'CQMshPUfvy';
const appName = 'EasyThanks - 이지땡스';

/** This key is setup in iOS. So don't touch it */
const serviceUrlSchemeIOS = 'com.rockwithsun.easythanks';

const NaverTestScreen = (): ReactElement => {
    const { wp } = useDimensions();
    useEffect(() => {
        NaverLogin.initialize({
            appName,
            consumerKey,
            consumerSecret,
            serviceUrlSchemeIOS,
            disableNaverAppAuthIOS: true,
        });
    }, []);

    const [success, setSuccessResponse] = useState<NaverLoginResponse['successResponse']>();

    const [failure, setFailureResponse] = useState<NaverLoginResponse['failureResponse']>();
    const [getProfileRes, setGetProfileRes] = useState<GetProfileResponse>();

    const login = async (): Promise<void> => {
        const { failureResponse, successResponse } = await NaverLogin.login();
        setSuccessResponse(successResponse);
        setFailureResponse(failureResponse);
    };

    const logout = async (): Promise<void> => {
        try {
            await NaverLogin.logout();
            setSuccessResponse(undefined);
            setFailureResponse(undefined);
            setGetProfileRes(undefined);
        } catch (e) {
            console.error(e);
        }
    };

    const getProfile = async (): Promise<void> => {
        try {
            const profileResult = await NaverLogin.getProfile(success!.accessToken);
            setGetProfileRes(profileResult);
        } catch (e) {
            setGetProfileRes(undefined);
        }
    };

    const deleteToken = async (): Promise<void> => {
        try {
            await NaverLogin.deleteToken();
            setSuccessResponse(undefined);
            setFailureResponse(undefined);
            setGetProfileRes(undefined);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <View style={{ flex: 1, width: wp(100), alignItems: 'center' }}>
            <CustomText>네이버</CustomText>
            <Gap />
            <Gap />
            <Button title={'Login'} onPress={login} />
            <Gap />
            <Button title={'Logout'} onPress={logout} />
            <Gap />
            {success ? (
                <>
                    <Button title="Get Profile" onPress={getProfile} />
                    <Gap />
                </>
            ) : null}
            {success ? (
                <View>
                    <Button title="Delete Token" onPress={deleteToken} />
                    <Gap />
                    <ResponseJsonText name={'Success'} json={success} />
                </View>
            ) : null}
            <Gap />
            {failure ? <ResponseJsonText name={'Failure'} json={failure} /> : null}
            <Gap />
            {getProfileRes ? <ResponseJsonText name={'GetProfile'} json={getProfileRes} /> : null}
        </View>
    );
};

export default NaverTestScreen;

const Gap = () => <View style={{ height: 20 }} />;
const ResponseJsonText = ({ name, json }: any) => (
    <CustomText>{name + ': ' + JSON.stringify(json)}</CustomText>
);
