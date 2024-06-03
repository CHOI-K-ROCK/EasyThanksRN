import React from 'react';

import { ColorValue, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaViewProps, SafeAreaView as CTXSafeAreaView } from 'react-native-safe-area-context';

import useCustomTheme from '../../hooks/useCustomTheme';

type Props = SafeAreaViewProps & {
    style?: ExtendedStyleProps;
};

type ExtendedStyleProps = ViewStyle & {
    topAreaBackgroundColor?: ColorValue;
    bottomAreaBackgroundColor?: ColorValue;
};

const SafeAreaView = (props: Props) => {
    const { style, ...restProps } = props;
    const { colors } = useCustomTheme();

    const flattenStyles = (StyleSheet.flatten(style) || {}) as ExtendedStyleProps;

    const backgroundColor = flattenStyles.backgroundColor || colors.background;
    const topAreaBackgroundColor = flattenStyles.topAreaBackgroundColor || backgroundColor;
    const bottomAreaBackgroundColor = flattenStyles.bottomAreaBackgroundColor || backgroundColor;

    return (
        <>
            <CTXSafeAreaView
                edges={['top']}
                style={[
                    {
                        backgroundColor: topAreaBackgroundColor || backgroundColor,
                    },
                ]}
            />
            {/* 메인 SafeAreaView backgroundColor */}
            <CTXSafeAreaView
                edges={['left', 'right']}
                style={[{ backgroundColor: backgroundColor }, styles.safeAreaView, style]}
                {...restProps}
            />
            {/* 상단 SafeAreaView backgroundColor */}
            <CTXSafeAreaView
                edges={['bottom']}
                style={[
                    {
                        backgroundColor: bottomAreaBackgroundColor || backgroundColor,
                    },
                ]}
            />
        </>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
});

export default SafeAreaView;
