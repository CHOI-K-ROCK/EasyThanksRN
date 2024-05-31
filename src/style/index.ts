import { StyleSheet, Platform } from 'react-native';

export const commonStyles = StyleSheet.create({
    dropShadow: {
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2.5 },
                shadowOpacity: 0.2,
                shadowRadius: 3,
            },
            android: {
                elevation: 2,
            },
        }),
    },
});
