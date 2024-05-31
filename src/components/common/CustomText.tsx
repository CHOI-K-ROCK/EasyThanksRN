import React from 'react';
import { TextProps } from 'react-native';
import { Text } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';

type Props = TextProps;

const CustomText = (props: Props) => {
    const { children, style, ...restProps } = props;

    const { colors } = useCustomTheme();

    return (
        <Text style={[{ color: colors.text }, style]} {...restProps}>
            {children}
        </Text>
    );
};

export default CustomText;
