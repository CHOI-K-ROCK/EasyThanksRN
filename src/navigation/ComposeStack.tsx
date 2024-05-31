import React from 'react';

import ComposeScreen from '../screens/compose/ComposeScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const ComposeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                presentation: 'fullScreenModal',
                headerShown: false,
            }}
        >
            <Stack.Screen name="ComposeScreen" component={ComposeScreen} />
        </Stack.Navigator>
    );
};

export default ComposeStack;
