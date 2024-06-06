import React from 'react';
import { ColorValue, DimensionValue, StyleSheet, View, ViewStyle } from 'react-native';

import useCustomTheme from '../../hooks/useCustomTheme';

type Props = {
    color?: ColorValue;
    height?: DimensionValue;
    width?: DimensionValue;
    style?: ViewStyle;
};

const HorizontalDivider = (props: Props) => {
    const { colors } = useCustomTheme();
    const { color = colors.text, height = 1, width = '100%', style } = props;

    return (
        <View
            style={[
                {
                    backgroundColor: color,
                    height,
                    width,
                },
                styles.divider,
                style,
            ]}
        />
    );
};

const styles = StyleSheet.create({
    divider: {
        opacity: 0.2,
    },
});

export default HorizontalDivider;
