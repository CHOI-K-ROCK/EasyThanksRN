import React from 'react';

import { Text, View } from 'react-native';
import SafeAreaView from '../components/common/SafeAreaView';

import { RootStackNavigationProps } from '../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../hooks/useCustomTheme';
import TempScreen from '../components/common/TempScreen';

const MainScreen = () => {
    const navigation = useNavigation<RootStackNavigationProps>();
    const { colors } = useCustomTheme();

    const onPress = () => {
        navigation.navigate('ComposeStack');
    };
    return (
        <SafeAreaView>
            <TempScreen title="MainScreen" />
        </SafeAreaView>
    );
};

export default MainScreen;
