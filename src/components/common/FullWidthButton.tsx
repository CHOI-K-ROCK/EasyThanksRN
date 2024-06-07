import React, { ReactNode } from 'react';

import { PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import PushAnimatedPressable from './PushAnimatedPressable';

import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from './CustomText';

type Props = PressableProps & {
    title: string;
    iconComponent?: ReactNode;
    iconPosition?: 'left' | 'right';
    style?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
};

const FullWidthButton = (props: Props) => {
    const { colors } = useCustomTheme();
    const { title, iconComponent, iconPosition = 'right', style, titleStyle, ...restProps } = props;

    return (
        <PushAnimatedPressable
            scale={0.98}
            style={[
                {
                    backgroundColor: colors.tabBarBackground,
                },
                styles.container,
                style,
            ]}
            {...restProps}
        >
            {iconComponent && iconPosition === 'left' && (
                <View style={styles.leftIconContainer}>{iconComponent}</View>
            )}
            <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>
            {iconComponent && iconPosition === 'right' && (
                <View style={styles.rightIconContainer}>{iconComponent}</View>
            )}
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 45,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 500,
    },
    leftIconContainer: {
        marginRight: 4,
    },
    rightIconContainer: {
        marginLeft: 4,
    },
});

export default FullWidthButton;
