import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import useCustomTheme from '../../hooks/useCustomTheme';
import MainNavigationBar from '../../components/main/MainNavigationBar';

const PostScreen = () => {
    const { colors } = useCustomTheme();

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar />
            <TempScreen title="PostScreen" />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default PostScreen;
