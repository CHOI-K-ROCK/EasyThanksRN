import React from 'react';

import LoginScreen from '../screens/auth/LoginScreen';
import SignInScreen from '../screens/auth/SignInScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            {/* <Stack.Screen name="SignInScreen" component={SignInScreen} /> */}
        </Stack.Navigator>
    );
};

export default AuthStack;
