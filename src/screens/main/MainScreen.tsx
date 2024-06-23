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

const MainScreen = () => {
    const { colors } = useCustomTheme();

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
            <ScreenLayout>
                <RotationThanksWordsView />
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default MainScreen;
