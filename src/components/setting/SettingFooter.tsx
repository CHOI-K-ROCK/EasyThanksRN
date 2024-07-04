import React from 'react';
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import CustomText from 'components/common/CustomText';
import VectorIcon from 'components/common/VectorIcon';

const SettingFooter = (props: { onPressOpenSource: () => void; style?: StyleProp<ViewStyle> }) => {
    const { onPressOpenSource, style } = props;

    const currentYear = new Date().getFullYear();
    const APP_VERSION = '0.2.1';

    return (
        <View style={[styles.container, style]}>
            <CustomText style={styles.text}>
                {`ⓒ ${currentYear}. KROCK All rights reserved.`}
            </CustomText>
            {/* 훅으로 앱 정보 가져올 수 있도록 개발 필요 */}
            <CustomText style={styles.text}>{`ver ${APP_VERSION}`}</CustomText>

            <TouchableOpacity
                onPress={onPressOpenSource}
                activeOpacity={0.5}
                style={styles.openSourceContainer}
            >
                <CustomText style={styles.text}>{`오픈소스 라이센스`}</CustomText>
                <VectorIcon name="chevron-right" size={14} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        opacity: 0.3,
        gap: 5,
    },
    text: {
        fontSize: 12,
        fontWeight: 300,
    },
    openSourceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default SettingFooter;
