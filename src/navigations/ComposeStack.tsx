import React from 'react';

import ComposeScreen from 'screens/compose/ComposeScreen';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditLocationScreen from 'screens/compose/EditLocationScreen';

const Stack = createNativeStackNavigator();

const ComposeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ComposeScreen" component={ComposeScreen} />
            <Stack.Screen name="EditLocationScreen" component={EditLocationScreen} />
        </Stack.Navigator>
    );
};

export default ComposeStack;
