import React, { ReactElement } from 'react';

import { PressableProps, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';

import useCustomTheme from 'hooks/useCustomTheme';
import CustomText from 'components/common/CustomText';

type Props = PressableProps & {
    title: string;
    iconComponent?: ReactElement;
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
            <CustomText
                style={[styles.title, titleStyle, restProps.disabled ? styles.titleDisabled : {}]}
            >
                {title}
            </CustomText>
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
    titleDisabled: {
        opacity: 0.4,
    },
    leftIconContainer: {
        marginRight: 4,
    },
    rightIconContainer: {
        marginLeft: 4,
    },
});

export default FullWidthButton;
