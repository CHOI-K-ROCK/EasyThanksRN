import { StyleSheet, Platform } from 'react-native';

export const commonStyles = StyleSheet.create({
    dropShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 4.5 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
