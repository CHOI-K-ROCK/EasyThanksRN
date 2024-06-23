import React, { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';

import SafeAreaView from '../../components/common/SafeAreaView';
import CustomText from '../../components/common/CustomText';
import { commonStyles } from '../../style';
import useCustomTheme from '../../hooks/useCustomTheme';
import useDimensions from '../../hooks/useDimensions';
import OauthIcon from '../../components/common/OauthIcon';
import useDelay from '../../hooks/useDelay';
import useLoading from '../../hooks/useLoading';

const LoginScreen = () => {
    const { colors } = useCustomTheme();
    const { wp, hp } = useDimensions();

    const delay = useDelay();
    const { isLoading, setLoading } = useLoading();

    console.log(isLoading);

    const buttonData = useMemo(
        () => [
            {
                provider: 'naver',
                onPress: () => { },
            },
            {
                provider: 'kakao',
                onPress: () => { },
            },
            {
                provider: 'google',
                onPress: async () => {
                    setLoading(true);
                    await delay(10000, () => console.log('google'));
                    setLoading(false);
                },
            },
        ],
        [delay, setLoading]
    );

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* 로고 */}
                <View style={[styles.logoContainer]}>
                    <CustomText style={[{ color: colors.mainColor }, styles.logo]}>
                        {'{ EasyThanks }'}
                    </CustomText>
                    <CustomText style={styles.catch}>매일매일, 감사일기</CustomText>
                </View>

                {/* 수직 라인 */}
                <View
                    style={{
                        height: hp(15),
                        width: 1,
                        backgroundColor: colors.mainColor,
                        marginVertical: 15,
                        opacity: 0.5,
                    }}
                />

                {/* 소셜 버튼 */}
                <View style={styles.socialLoginButtonContainer}>
                    <View style={{ flexDirection: 'row', gap: 20, marginBottom: 5 }}>
                        {buttonData.map(button => {
                            const { provider, onPress } = button;

                            return (
                                <OauthIcon
                                    key={provider}
                                    provider={provider as any}
                                    style={styles.socialLoginButton}
                                    onPress={onPress}
                                />
                            );
                        })}
                    </View>
                    <CustomText style={[styles.socialLoginTitle]}>소셜 계정으로 로그인</CustomText>
                </View>
                {/* SNS 로그인 버튼 */}
                {/* 회원 가입은 패스*/}
                {/* 카카오, 구글, 네이버 */}
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
    socialLoginButtonContainer: {
        alignItems: 'center',
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
