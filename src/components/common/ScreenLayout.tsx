import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const ScreenLayout = (props: ViewProps) => {
    const { style, ...restProps } = props;
    return <View style={[styles.container, style]} {...restProps} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
    },
});

export default ScreenLayout;
