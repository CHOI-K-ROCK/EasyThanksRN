import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import WriteThanksScreen from '../screens/WriteThanksScreen';
import PastThanksScreen from '../screens/PastThanksScreen';

const Tab = createBottomTabNavigator();

const MainStack = () => {
    return (
        <Tab.Navigator initialRouteName="MainScreen">
            <Tab.Screen component={WelcomeScreen} name="WelcomeScreen" />
            <Tab.Screen
                component={WriteThanksScreen}
                name="WriteThanksScreen"
            />
            <Tab.Screen component={PastThanksScreen} name="PastThanksScreen" />
        </Tab.Navigator>
    );
};

export default MainStack;
