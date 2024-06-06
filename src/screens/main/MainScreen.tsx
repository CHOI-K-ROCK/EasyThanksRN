import React, { useCallback } from 'react';

import { TouchableOpacity } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import ScreenLayout from '../../components/common/ScreenLayout';

const MainScreen = () => {
    const { navigate } = useNavigation<RootStackNavigationProps>();

    const { colors } = useCustomTheme();

    const toAppMenu = () => {
        navigate('AppMenuStack', {
            screen: 'AppMenuScreen',
        });
    };

    const renderNavigationLeftComponent = () => {
        return (
            <TouchableOpacity onPress={toAppMenu}>
                <VectorIcon name="cog" size={25} color={colors.text} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar leftComponent={renderNavigationLeftComponent} />
            <ScreenLayout>
                <TempScreen title="MainScreen" />
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default MainScreen;
