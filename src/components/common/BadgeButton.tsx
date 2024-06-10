import React from 'react';

import CustomText from './CustomText';
import PushAnimatedPressable from './PushAnimatedPressable';

import useCustomTheme from '../../hooks/useCustomTheme';
import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type Props = {
    title: string;
    onPress?: () => void;

    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
};

const BadgeButton = (props: Props) => {
    const { colors } = useCustomTheme();

    const { title, onPress, style, textStyle } = props;

    return (
        <PushAnimatedPressable
            onPress={onPress}
            scale={0.98}
            style={[
                {
                    backgroundColor: colors.mainColor,
                },
                styles.badge,
                style,
            ]}
        >
            <CustomText style={[styles.title, textStyle]}>{title}</CustomText>
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    badge: {
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderRadius: 3,
    },
    title: {
        fontWeight: 600,
        fontSize: 13,
        color: '#00000090',
    },
});

export default BadgeButton;
