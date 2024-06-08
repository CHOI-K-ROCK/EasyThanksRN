import React from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ColorValue,
    ViewStyle,
} from 'react-native';
import SafeAreaView from './SafeAreaView';
import { SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = SafeAreaViewProps & {
    style?: ExtendedStyleProps;
    keyboardAvoiding?: boolean;
};

type ExtendedStyleProps = ViewStyle & {
    topAreaBackgroundColor?: ColorValue;
    bottomAreaBackgroundColor?: ColorValue;
};

const WithKeyboardSafeAreaView = (props: Props) => {
    const { bottom } = useSafeAreaInsets();
    const { keyboardAvoiding = true, ...restProp } = props;

    return (
        <KeyboardAvoidingView
            enabled={keyboardAvoiding}
            behavior={'padding'}
            keyboardVerticalOffset={-bottom}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView {...restProp} />
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default WithKeyboardSafeAreaView;
