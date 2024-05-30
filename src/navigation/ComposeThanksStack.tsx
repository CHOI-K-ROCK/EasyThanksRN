import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ComposeThanksScreen from '../screens/ComposeThanksScreen';

const Stack = createNativeStackNavigator();

const ComposeThanksStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ComposeThanksScreen"
                component={ComposeThanksScreen}
            />
        </Stack.Navigator>
    );
};

export default ComposeThanksStack;
