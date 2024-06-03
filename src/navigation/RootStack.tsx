import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    BottomTabBarProps,
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import MainTabBar from '../components/MainTab/MainTabBar';

import MainScreen from '../screens/MainScreen';
import PostArchiveScreen from '../screens/PostArchiveScreen';
import ComposeStack from './ComposeStack';

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
            <Tab.Screen
                component={PostArchiveScreen}
                name="PostArchiveScreen"
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

export default RootStack;
