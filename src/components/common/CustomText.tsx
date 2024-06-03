import React, { useMemo } from 'react';
import { Text, Platform, StyleSheet, TextProps } from 'react-native';

import useCustomTheme from '../../hooks/useCustomTheme';

import { convertFontWeightToFontFamily } from '../../utils/fonts';

type Props = TextProps;

export type FontWeightType =
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;

const CustomText = (props: Props) => {
    const { children, style, ...restProps } = props;
    const { colors } = useCustomTheme();

    const flattenedStyle = StyleSheet.flatten(style) || {};
    const fontWeight = flattenedStyle.fontWeight as FontWeightType;
    const fontFamilyForAndroid = useMemo(
        () => convertFontWeightToFontFamily(fontWeight),
        [fontWeight]
    );

    const fontStyleByOS = Platform.select({
        ios: { fontFamily: 'Pretendard', fontWeight },
        android: { fontFamily: fontFamilyForAndroid },
    });

    return (
        <Text
            style={[
                {
                    color: colors.text,
                },
                fontStyleByOS,
                style,
            ]}
            {...restProps}
        >
            {children}
        </Text>
    );
};

export default React.memo(CustomText);
