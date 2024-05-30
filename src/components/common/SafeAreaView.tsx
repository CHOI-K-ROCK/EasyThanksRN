import React, { ReactNode } from 'react';
import { SafeAreaView as RNSafeAreaView, StyleSheet } from 'react-native';

type Props = { children: ReactNode };

const SafeAreaView = (props: Props) => {
    const { children } = props;

    return <RNSafeAreaView style={styles.safeAreaView} children={children} />;
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
});

export default SafeAreaView;
