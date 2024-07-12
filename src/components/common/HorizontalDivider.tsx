import React from 'react';
import { ColorValue, DimensionValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import useCustomTheme from 'hooks/useCustomTheme';
import useDimensions from 'hooks/useDimensions';

type Props = {
    color?: ColorValue;
    height?: DimensionValue;
    width?: DimensionValue;
    style?: StyleProp<ViewStyle>;
    type?: 'line' | 'block';
};

const HorizontalDivider = (props: Props) => {
    const { colors } = useCustomTheme();
    const { wp } = useDimensions();
    const { type = 'line' } = props;
    const isLineDivider = type === 'line';
    const {
        color = isLineDivider ? colors.text : colors.divider,
        height = isLineDivider ? 1 : 15,
        width = '100%',
        style,
    } = props;

    const LineDivider = () => (
        <View
            style={[
                styles.lineDivider,
                {
                    backgroundColor: color,
                    height,
                    width,
                },
                style,
            ]}
        />
    );

    const BlockDivider = () => (
        <View
            style={[
                {
                    backgroundColor: color,
                    height,
                    width: wp(100),
                },
                styles.blockDivider,
                style,
            ]}
        />
    );

    const Divider = type === 'line' ? LineDivider : BlockDivider;

    return <Divider />;
};

const styles = StyleSheet.create({
    lineDivider: {
        opacity: 0.2,
    },
    blockDivider: {
        left: -15, // common padding horizontal
    },
});

export default React.memo(HorizontalDivider);
