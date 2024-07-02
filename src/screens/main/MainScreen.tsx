import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../../components/common/CustomText';

import KakaoTestScreen from '../KakaoTestScreen';
import NaverTestScreen from '../NaverTestScreen';
import GoogleTestScreen from '../GoogleTestScreen';
import { ScrollView, View } from 'react-native';
import useDimensions from '../../hooks/useDimensions';
import useAuth from '../../hooks/useAuth';
import useAppTheme from '../../hooks/useAppTheme';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    const { wp } = useDimensions();
    const { logout } = useAuth();

    const { navigate } = useNavigation<RootStackNavigationProps>();
    const { setAppTheme } = useAppTheme();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <View style={{ gap: 20 }}>
                <CustomText style={{ fontSize: 25 }} onPress={logout}>
                    handleLogout
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setAppTheme('device')}>
                    dev
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setAppTheme('light')}>
                    lig
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setAppTheme('dark')}>
                    dar
                </CustomText>
            </View>
            {/* <ScrollView horizontal snapToEnd snapToInterval={wp(100)} decelerationRate={'fast'}>
                <KakaoTestScreen />
                <NaverTestScreen />
                <GoogleTestScreen />
            </ScrollView> */}
            {/* <ScreenLayout> */}
            {/* <RotationThanksWordsView /> */}

            {/* </ScreenLayout> */}
        </SafeAreaView>
    );
};

export default MainScreen;
