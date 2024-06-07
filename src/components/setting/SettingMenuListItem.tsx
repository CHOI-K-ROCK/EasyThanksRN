import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import CustomText from '../common/CustomText';
import HorizontalDivider from '../common/HorizontalDivider';

type Props = TouchableOpacityProps & { title: string; subtitle: string };

const SettingMenuListItem = (props: Props) => {
    const { title, subtitle, ...restProps } = props;

    return (
        <View>
            <HorizontalDivider />
            <TouchableOpacity activeOpacity={0.7} style={[{}, styles.container]} {...restProps}>
                <CustomText style={styles.title}>{title}</CustomText>
                <CustomText style={styles.subtitle}>{subtitle}</CustomText>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 12,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 5,
    },
    subtitle: {
        opacity: 0.8,
    },
});

export default React.memo(SettingMenuListItem);
