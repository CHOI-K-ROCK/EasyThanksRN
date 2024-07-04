import React from 'react';

import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import useCustomTheme from 'hooks/useCustomTheme';
import MaskedView from '@react-native-masked-view/masked-view';
import VectorIcon from './VectorIcon';

import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
    checked: boolean;
    onPress?: (checked: boolean) => void;
    size?: number;
    style?: StyleProp<ViewStyle>;
};

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CheckBox = (props: Props) => {
    const { colors } = useCustomTheme();
    const { checked, onPress, size = 20, style } = props;

    const ANIMATION_DURATION = { duration: 250 };

    const DISABLED_BACKGROUND_COLOR = colors.inputBackground;
    const ACTIVE_BACKGROUND_COLOR = '#000';
    const ICON_COLOR = '#fff';

    const _onPress = () => {
        onPress && onPress(checked);
    };

    const checkAnimatedStyle = useAnimatedStyle(() => {
        const checkTransX = withTiming(checked ? 0 : -size, ANIMATION_DURATION);

        return {
            transform: [{ translateX: checkTransX }],
        };
    });

    return (
        <AnimatedTouchableOpacity
            onPress={_onPress}
            style={[
                {
                    backgroundColor: checked ? ACTIVE_BACKGROUND_COLOR : DISABLED_BACKGROUND_COLOR,
                    padding: 3,
                    borderRadius: 4,
                },
                style,
            ]}
        >
            <MaskedView
                maskElement={
                    <Animated.View
                        style={[
                            {
                                ...styles.maskedViewStyle,
                            },
                            checkAnimatedStyle,
                        ]}
                    />
                }
            >
                <VectorIcon name={'check'} size={size - 2} color={ICON_COLOR} />
            </MaskedView>
        </AnimatedTouchableOpacity>
    );
};

const styles = StyleSheet.create({
    checkboxStyle: {
        aspectRatio: 1,
        borderWidth: 1,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    maskedViewStyle: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#000',
    },
});

export default CheckBox;
