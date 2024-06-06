import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SettingScreen from '../screens/setting/SettingScreen';
import NotificationScreen from '../screens/setting/notification/NotificationScreen';
import NotificationSettingScreen from '../screens/setting/notification/NotificationSettingScreen';
import UserOptOutScreen from '../screens/setting/user/UserOptOutScreen';
import UserProfileEditScreen from '../screens/setting/user/UserProfileEditScreen';
import OpenSourceScreen from '../screens/setting/openSource/OpenSourceScreen';
import OpenSourceDetailScreen from '../screens/setting/openSource/OpenSourceDetailScreen';

const Stack = createNativeStackNavigator();

const SettingStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="SettingScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="UserProfileEditScreen" component={UserProfileEditScreen} />
            <Stack.Screen name="UserOptOutScreen" component={UserOptOutScreen} />
            <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
            <Stack.Screen name="NotificationSettingScreen" component={NotificationSettingScreen} />
            <Stack.Screen name="OpenSourceScreen" component={OpenSourceScreen} />
            <Stack.Screen name="OpenSourceDetailScreen" component={OpenSourceDetailScreen} />
        </Stack.Navigator>
    );
};

export default SettingStack;
