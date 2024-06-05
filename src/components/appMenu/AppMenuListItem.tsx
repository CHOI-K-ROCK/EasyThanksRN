import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../common/CustomText';

type Props = TouchableOpacityProps & { title: string; subtitle: string };

const AppMenuListItem = (props: Props) => {
    const { colors } = useCustomTheme();
    const { title, subtitle, ...restProps } = props;

    return (
        <TouchableOpacity style={[{ backgroundColor: colors.tabBarBackground }, styles.container]} {...restProps}>
            <CustomText>{title}</CustomText>
            <CustomText>{subtitle}</CustomText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        borderRadius: 15,
    },
});

export default React.memo(AppMenuListItem);
