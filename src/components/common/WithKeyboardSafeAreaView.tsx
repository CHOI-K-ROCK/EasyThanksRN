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
    const { bottom, top } = useSafeAreaInsets();
    const { keyboardAvoiding = true, children, ...restProp } = props;

    return (
        <SafeAreaView {...restProp}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <KeyboardAvoidingView
                    enabled={keyboardAvoiding}
                    behavior={'padding'}
                    keyboardVerticalOffset={top}
                    style={{ flex: 1 }}
                    children={children}
                />
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default WithKeyboardSafeAreaView;
