import React, { useCallback } from 'react';

import { TouchableOpacity } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import { getRandomString } from '../../utils/string';

const MainScreen = () => {
    const navigation = useNavigation<RootStackNavigationProps>();

    const { colors } = useCustomTheme();

    const toAppMenu = useCallback(() => {
        navigation.navigate('AppMenuStack', {
            screen: 'AppMenuScreen',
        });
    }, [navigation]);

    const renderNavigationLeftComponent = () => {
        return (
            <TouchableOpacity onPress={toAppMenu}>
                <VectorIcon name="menu" size={30} color={colors.text} />
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar leftComponent={renderNavigationLeftComponent} />
            {/* <ScrollView> */}
            <TempScreen title="MainScreen" />
            {/* </ScrollView> */}
        </SafeAreaView>
    );
};

export default MainScreen;
