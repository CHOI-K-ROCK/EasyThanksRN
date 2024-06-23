import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MainTabBar from '../components/main/MainTabBar';

import MainScreen from '../screens/main/MainScreen';
import PostScreen from '../screens/post/PostScreen';

import ComposeStack from './ComposeStack';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const renderMainTabBar = (props: BottomTabBarProps) => {
    return <MainTabBar {...props} />;
};

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}
            tabBar={renderMainTabBar}
        >
            <Tab.Screen component={MainScreen} name="MainScreen" />
            <Tab.Screen component={PostScreen} name="PostScreen" />
        </Tab.Navigator>
    );
};

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Main Tab */}
            <Stack.Screen component={MainTab} name="MainTab" />

            {/* Compose */}
            <Stack.Screen
                component={ComposeStack}
                name="ComposeStack"
                options={{
                    presentation: 'card',
                    animation: 'slide_from_bottom',
                    gestureEnabled: false,
                    animationDuration: 250,
                }}
            />

            {/* AppMenu */}
            <Stack.Screen component={SettingStack} name="SettingStack" />
        </Stack.Navigator>
    );
};

export default RootStack;
