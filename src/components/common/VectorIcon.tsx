import React, { useCallback } from 'react';
import { ColorValue, Platform, StyleSheet, View, ViewStyle } from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useCustomTheme from '../../hooks/useCustomTheme';

export type iconProviderType =
    | 'MaterialCommunityIcons'
    | 'MaterialIcons'
    | 'Feather'
    | 'FontAwesome5'
    | 'FontAwesome6'
    | 'Ionicons';

type Props = {
    name: string;
    size?: number;
    color?: ColorValue;
    iconProvider?: iconProviderType;

    continerStyle?: ViewStyle;
};

const VectorIcon = (props: Props) => {
    const { colors } = useCustomTheme();

    const {
        name = 'camera',
        color = colors.text,
        size = 20,
        iconProvider = 'MaterialCommunityIcons',
        continerStyle,
    } = props;

    const getIconComponent = useCallback(() => {
        switch (iconProvider) {
            case 'MaterialCommunityIcons':
                return MaterialCommunityIcons;
            case 'MaterialIcons':
                return MaterialIcons;
            case 'Feather':
                return Feather;
            case 'FontAwesome5':
                return FontAwesome5;
            case 'FontAwesome6':
                return FontAwesome6;
            case 'Ionicons':
                return Ionicons;
        }
    }, [iconProvider]);

    const Icon = getIconComponent();

    return (
        <View style={continerStyle}>
            <Icon style={styles.icon} name={name} size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        marginTop: Platform.select({
            // 안드로이드 아이콘 위치 보정
            android: 5,
        }),
    },
});

export default React.memo(VectorIcon);
