import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

const withKeyboardDissmiss = (Component: React.ComponentType<any>) => {
    return (props: any) => {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Component {...props} />
            </TouchableWithoutFeedback>
        );
    };
};

export default withKeyboardDissmiss;
