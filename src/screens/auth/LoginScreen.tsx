import React, { useCallback, useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import SafeAreaView from '../../components/common/SafeAreaView';
import CustomText from '../../components/common/CustomText';
import SsoIcon from '../../components/common/SsoIcon';

import { SsoProviderType } from '../../@types/models/user';

import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';
import useLoading from '../../hooks/useLoading';
import useAuth from '../../hooks/useAuth';

import { commonStyles } from '../../style';

const LoginScreen = () => {
    const { colors } = useCustomTheme();
    const { hp } = useDimensions();
    const { ssoLogin } = useAuth();

    const { setLoading } = useLoading();

    const handleLogin = useCallback(
        async (provider: SsoProviderType) => {
            setLoading(true);
            await ssoLogin(provider);
            setLoading(false);
        },
        [setLoading, ssoLogin]
    );

    const buttonData = useMemo(
        () => [
            {
                provider: 'naver',
                onPress: () => handleLogin('naver'),
            },
            {
                provider: 'kakao',
                onPress: () => handleLogin('kakao'),
            },
            {
                provider: 'google',
                onPress: () => handleLogin('google'),
            },
        ],
        [handleLogin]
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* <CustomText>{data && Object.values(data)}</CustomText> */}
                {/* 로고 */}
                <View style={[styles.logoContainer]}>
                    <CustomText style={[{ color: colors.mainColor }, styles.logo]}>
                        {'EasyThanks'}
                    </CustomText>
                    <CustomText style={styles.catch}>매일매일, 감사일기</CustomText>
                </View>

                {/* 포인트 라인 */}
                <View
                    style={[
                        {
                            height: hp(15),
                            backgroundColor: colors.mainColor,
                        },
                        styles.pointLine,
                    ]}
                />

                {/* 소셜 버튼 */}
                <View style={styles.socialLoginButtonContainer}>
                    {buttonData.map(button => {
                        const { provider, onPress } = button;

                        return (
                            <SsoIcon
                                key={provider}
                                provider={provider as any}
                                style={styles.socialLoginButton}
                                onPress={onPress}
                            />
                        );
                    })}
                </View>
                <CustomText style={[styles.socialLoginTitle]}>
                    {'소셜 계정으로 시작하기'}
                </CustomText>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...commonStyles.centered,
    },
    logoContainer: {},
    logo: {
        fontSize: 28,
        fontWeight: 700,
        marginBottom: 5,
    },
    catch: {
        fontSize: 14,
        fontWeight: 200,
        textAlign: 'center',
    },
    pointLine: {
        width: 1,

        marginVertical: 15,
        opacity: 0.5,
    },
    socialLoginButtonContainer: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 5,
    },
    socialLoginTitle: {
        fontSize: 12,
        marginVertical: 5,
        opacity: 0.5,
    },
    socialLoginButton: {
        width: 40,
        height: 40,
    },
});

export default LoginScreen;
