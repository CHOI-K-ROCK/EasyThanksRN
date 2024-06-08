import React from 'react';

import {
    KeyboardAvoidingView as RNKeyboardAvoidingView,
    KeyboardAvoidingViewProps,
    Platform,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = KeyboardAvoidingViewProps & { bottomOffset?: number };

const KeyboardAvoidingView = (props: Props) => {
    const { bottomOffset = 0, style, ...restProps } = props;
    const { top } = useSafeAreaInsets();

    return (
        <RNKeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // behavior={'position'}
            keyboardVerticalOffset={bottomOffset}
            style={[{ flex: 1 }, style]}
            {...restProps}
        />
    );
};

export default KeyboardAvoidingView;
