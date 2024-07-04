import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import { commonStyles } from 'style';
import VectorIcon from 'components/common/VectorIcon';
import useCustomTheme from 'hooks/useCustomTheme';

type Props = {
    title: string;
    subTitle?: string;
    chevron?: boolean;

    leftComponenet?: ReactElement;
    rightComponent?: ReactElement;
} & TouchableOpacityProps;

const SettingListItem = (props: Props) => {
    const { title, subTitle, chevron, leftComponenet, rightComponent, ...restProps } = props;
    const { colors } = useCustomTheme();

    return (
        <View>
            <TouchableOpacity activeOpacity={0.7} style={styles.container} {...restProps}>
                {leftComponenet && leftComponenet}

                <View>
                    <CustomText style={styles.title}>{title}</CustomText>
                    {subTitle && <CustomText style={styles.subtitle}>{subTitle}</CustomText>}
                </View>

                {chevron && <VectorIcon name={'chevron-right'} color={colors.text + '70'} />}
                {rightComponent && rightComponent}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...commonStyles.rowCenter,
        justifyContent: 'space-between',
        minHeight: 65,
        borderRadius: 10,
    },
    title: {
        fontSize: 17,
        fontWeight: 600,
    },
    subtitle: {
        marginTop: 5,
        fontSize: 13,
        opacity: 0.7,
    },
});

export default React.memo(SettingListItem);
