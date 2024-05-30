import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import PastThanksScreen from '../screens/PastThanksScreen';
import ComposeThanksStack from './ComposeThanksStack';
import MainTabComposeButton from '../components/MainTab/MainTabComposeButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ComposeThanks = () => {
    // 버튼 커스텀을 위한 임시 컴포넌트
    return null;
};

const renderCustomButton = () => {
    return <MainTabComposeButton containerStyle={{ top: -30 }} />;
};

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 90,
                    bottom: 25,
                    left: 25,
                    right: 25,
                    position: 'absolute',
                    borderRadius: 15,
                    elevation: 0,
                },
            }}
        >
            <Tab.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <Tab.Screen
                component={ComposeThanks}
                name="ComposeThanks"
                options={{ tabBarButton: renderCustomButton }}
            />
            <Tab.Screen component={PastThanksScreen} name="PastThanksScreen" />
        </Tab.Navigator>
    );
};

const RootStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen component={MainTab} name="MainTab" />
            <Stack.Group
                screenOptions={{
                    presentation: 'modal',
                }}
            >
                <Stack.Screen
                    component={ComposeThanksStack}
                    name="ComposeThanksStack"
                />
            </Stack.Group>
        </Stack.Navigator>
    );
};

export default RootStack;
