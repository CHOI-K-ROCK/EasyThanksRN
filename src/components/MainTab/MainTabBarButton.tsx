import React from 'react';

import { ColorValue, StyleSheet, View, ViewStyle } from 'react-native';
import CustomText from '../common/CustomText';
import VectorIcon, { iconProviderType } from '../common/VectorIcon';

import useCustomTheme from '../../hooks/useCustomTheme';
import useDimesions from '../../hooks/useDimesions';
import PushAnimatedPressable from '../common/PushAnimatedPressable';

type Props = {
    tabName: string;

    iconName: string;
    iconProvider?: iconProviderType;
    size?: number;

    isActive: boolean;
    activeColor?: ColorValue;
    inactiveColor?: ColorValue;

    containerStyle?: ViewStyle;
    onPress: () => void;
};

const MainTabBarButton = (props: Props) => {
    const { colors } = useCustomTheme();
    const { wp } = useDimesions();

    const {
        tabName,

        iconName,
        iconProvider,
        size = 30,

        isActive,
        activeColor = colors.tabBarIconActive,
        inactiveColor = colors.tabBarIconInactive,

        containerStyle,
        onPress,
    } = props;

    const iconColor = isActive ? activeColor : inactiveColor;
    const textColor = isActive ? colors.text : colors.tabBarIconInactive;

    return (
        <PushAnimatedPressable
            onPress={onPress}
            style={[styles.container, containerStyle]}
        >
            <VectorIcon
                name={iconName}
                color={iconColor}
                size={size}
                iconProvider={iconProvider}
                continerStyle={{ marginBottom: wp(1) }}
            />
            <CustomText style={{ color: textColor, fontSize: 12 }}>
                {tabName}
            </CustomText>
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
});

export default MainTabBarButton;
