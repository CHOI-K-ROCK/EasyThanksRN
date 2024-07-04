import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import useCustomTheme from 'hooks/useCustomTheme';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'types/navigations/rootStack';

const PostScreen = () => {
    const { colors } = useCustomTheme();
    const { navigate } = useNavigation<RootStackNavigationProps>();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default PostScreen;
