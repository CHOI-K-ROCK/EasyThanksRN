import React from 'react';

import { ColorValue, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaViewProps, useSafeAreaInsets } from 'react-native-safe-area-context';

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
    const { top, left, right, bottom } = useSafeAreaInsets();

    const flattenStyles = (StyleSheet.flatten(style) || {}) as ExtendedStyleProps;

    const backgroundColor = flattenStyles.backgroundColor || colors.background;
    const topAreaBackgroundColor = flattenStyles.topAreaBackgroundColor || backgroundColor;
    const bottomAreaBackgroundColor = flattenStyles.bottomAreaBackgroundColor || backgroundColor;

    /**
     * View 이용사유
     * 스크린 전환 간에 깜빡이는 현상이 있어 View + useSafeAreaInsets 사용으로 해결
     */
    return (
        <>
            {/* 상단 SafeAreaView backgroundColor */}
            <View
                style={[
                    {
                        backgroundColor: topAreaBackgroundColor || backgroundColor,
                        paddingTop: top,
                    },
                ]}
            />
            {/* 메인 컨텐츠 영역 backgroundColor */}
            <View
                style={[
                    {
                        backgroundColor: backgroundColor,
                        paddingRight: right,
                        paddingLeft: left,
                    },
                    styles.safeAreaView,
                    style,
                ]}
                {...restProps}
            />
            {/* 하단 SafeAreaView backgroundColor */}
            <View
                style={[
                    {
                        backgroundColor: bottomAreaBackgroundColor || backgroundColor,
                        paddingBottom: bottom,
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
