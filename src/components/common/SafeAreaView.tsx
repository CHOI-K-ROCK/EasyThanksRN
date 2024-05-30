import React from 'react';

import { SafeAreaView as RNSafeAreaView, StyleSheet } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';

import useCustomTheme from '../../hooks/useCustomTheme';

const SafeAreaView = (props: SafeAreaViewProps) => {
    const { style, ...restProps } = props;
    const { colors } = useCustomTheme();

    return (
        <RNSafeAreaView
            style={[
                { backgroundColor: colors.background },
                styles.safeAreaView,
                style,
            ]}
            {...restProps}
        />
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
});

export default SafeAreaView;
