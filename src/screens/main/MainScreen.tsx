import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../../components/common/CustomText';

import useToast from '../../hooks/useToast';
import RotationThanksWordsView from '../../components/main/RotationThanksWordsView';
import ScreenLayout from '../../components/common/ScreenLayout';
import KakaoTestScreen from '../KakaoTestScreen';
import NaverTestScreen from '../NaverTestScreen';
import GoogleTestScreen from '../GoogleTestScreen';
import { ScrollView } from 'react-native';
import useDimensions from '../../hooks/useDimensions';
import { useAtomValue } from 'jotai';
import useAuth from '../../logics/useAuth';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    const { wp } = useDimensions();
    const { logout } = useAuth();

    const { navigate } = useNavigation<RootStackNavigationProps>();

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
            <ScrollView horizontal snapToEnd snapToInterval={wp(100)} decelerationRate={'fast'}>
                <KakaoTestScreen />
                <NaverTestScreen />
                <GoogleTestScreen />
            </ScrollView>
            {/* <ScreenLayout> */}
            {/* <RotationThanksWordsView /> */}

            {/* </ScreenLayout> */}
            <CustomText style={{ fontSize: 25, position: 'absolute', top: 200 }} onPress={logout}>
                handleLogout
            </CustomText>
        </SafeAreaView>
    );
};

export default MainScreen;
