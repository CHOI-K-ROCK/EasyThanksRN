import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { commonStyles } from 'styles';
import MainTabBarButton from 'components/main/MainTabBarButton';
import MainTabBarComposeButton from 'components/main/MainTabBarComposeButton';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import useCustomTheme from 'hooks/useCustomTheme';

const MainTabBar = (props: BottomTabBarProps) => {
    const { colors } = useCustomTheme();
    const { navigation, state } = props;

    const { index } = state;

    return (
        <View style={[{ backgroundColor: colors.tabBarBackground }, styles.mainTab]}>
            <MainTabBarButton
                tabName="메인화면"
                iconName="home"
                isActive={index === 0}
                onPress={() => navigation.navigate('MainScreen')}
            />
            <MainTabBarComposeButton
                containerStyle={styles.composeButton}
                onPress={() =>
                    navigation.navigate('BottomSheetComposeStack', {
                        screen: 'ComposeScreen',
                    })
                }
            />
            <MainTabBarButton
                tabName="지난감사"
                iconName="book"
                isActive={index === 1}
                onPress={() => navigation.navigate('PostScreen')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mainTab: {
        height: 80,
        position: 'absolute',
        bottom: Platform.select({ ios: 35, android: 25 }),
        left: 20,
        right: 20,

        borderRadius: 15,
        borderTopWidth: 0,
        paddingBottom: 5,
        paddingHorizontal: 20,

        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        ...commonStyles.dropShadow,
    },
    composeButton: { top: -20 },
});

export default MainTabBar;
