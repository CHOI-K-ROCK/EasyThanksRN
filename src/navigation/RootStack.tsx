import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import PastThanksScreen from '../screens/PastThanksScreen';
import ComposeThanksStack from './ComposeThanksStack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabComposeButton from '../components/MainTab/MainTabComposeButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ComposeThanks = () => {
    // 버튼 커스텀을 위한 임시 컴포넌트
    return null;
};

const renderCustomButton = () => {
    return <MainTabComposeButton containerStyle={{ marginBottom: 20 }} />;
};

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="WelcomeScreen"
            screenOptions={{ headerShown: false, tabBarStyle: { height: 80 } }}
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
