import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppMenuScreen from '../screens/appMenu/AppMenuScreen';
import NotificationScreen from '../screens/appMenu/notification/NotificationScreen';
import NotificationSettingScreen from '../screens/appMenu/notification/NotificationSettingScreen';
import UserOptOutScreen from '../screens/appMenu/user/UserOptOutScreen';
import UserProfileScreen from '../screens/appMenu/user/UserProfileScreen';

const Stack = createNativeStackNavigator();

const AppMenuStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="AppMenuScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AppMenuScreen" component={AppMenuScreen} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
            <Stack.Screen name="UserOptOutScreen" component={UserOptOutScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="NotificationSettingScreen" component={NotificationSettingScreen} />
        </Stack.Navigator>
    );
};

export default AppMenuStack;
