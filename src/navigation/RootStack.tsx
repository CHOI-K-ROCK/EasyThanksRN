import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import MainTabComposeButton from '../components/MainTab/MainTabComposeButton';
import MainTabBarButton from '../components/MainTab/MainTabBarButton';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import useCustomTheme from '../hooks/useCustomTheme';

import MainScreen from '../screens/MainScreen';
import PostArchiveScreen from '../screens/PostArchiveScreen';
import ComposeStack from './ComposeStack';

import { commonStyles } from '../style';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Compose = () => {
    // 커스텀 버튼을 위한 임시 컴포넌트
    return null;
};

const MainTab = () => {
    const { colors } = useCustomTheme();

    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        backgroundColor: colors.tabBarBackground,
                    },
                    styles.mainTab,
                    commonStyles.dropShadow,
                ],
            }}
        >
            {/* 터치 제스쳐를 가진 요소가 버튼 컴포넌트를 감싸는 경우 */}
            {/* 탭 이동을 위한 제스쳐가 정상적으로 이루어 지지 않음. */}
            {/* options 의 navigation 객체를 사용하여 onPress 이벤트로 전달하여 해결. */}

            <Tab.Screen
                component={MainScreen}
                name="MainScreen"
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <MainTabBarButton
                            tabName="메인화면"
                            iconName="home"
                            isActive={focused}
                            onPress={() => navigation.navigate('MainScreen')}
                        />
                    ),
                })}
            />
            <Tab.Screen
                component={Compose}
                name="Compose"
                options={({ navigation }) => ({
                    tabBarIcon: () => (
                        <MainTabComposeButton
                            onPress={() => navigation.navigate('ComposeStack')}
                            containerStyle={{ top: -20 }}
                        />
                    ),
                })}
            />
            <Tab.Screen
                component={PostArchiveScreen}
                name="PostArchiveScreen"
                options={({ navigation }) => ({
                    tabBarIcon: ({ focused }) => (
                        <MainTabBarButton
                            tabName="지난감사"
                            iconName="book"
                            isActive={focused}
                            onPress={() =>
                                navigation.navigate('PostArchiveScreen')
                            }
                        />
                    ),
                })}
            />
        </Tab.Navigator>
    );
};

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={MainTab} name="MainTab" />
            <Stack.Group
                screenOptions={{
                    presentation: 'fullScreenModal',
                    animation: 'slide_from_bottom',
                }}
            >
                <Stack.Screen component={ComposeStack} name="ComposeStack" />
            </Stack.Group>
        </Stack.Navigator>
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
        elevation: 0,
        borderTopWidth: 0,
        paddingBottom: 5,
        paddingHorizontal: 20,
    },
    tabBarButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RootStack;
