import React from 'react';

import { StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import FullWidthButton from 'components/common/FullWidthButton';
import useCustomTheme from 'hooks/useCustomTheme';

import { commonStyles } from 'styles';

type Props = {
    onPressOptOut: () => void;
};

const OptOutCautionView = (props: Props) => {
    const { colors } = useCustomTheme();
    const { onPressOptOut } = props;

    return (
        <View style={styles.optOutContainer}>
            <CustomText style={styles.optOutTitle}>{'회원 탈퇴'}</CustomText>
            <View
                style={[{ backgroundColor: colors.tabBarBackground }, styles.optOutInnerContainer]}
            >
                <CustomText style={styles.optOutCaution}>
                    {'회원 탈퇴 시 작성된 모든 일기 및 데이터가 초기화됩니다.'}
                </CustomText>
                <CustomText style={styles.optOutCaution}>
                    {'회원 탈퇴 후 데이터를 복구 할 수 없습니다.'}
                </CustomText>
                <CustomText style={styles.optOutCaution}>{'신중하게 고려해주세요!'}</CustomText>
                <FullWidthButton
                    title={'회원탈퇴하기'}
                    onPress={onPressOptOut}
                    style={[{ backgroundColor: colors.warning }, styles.optOutButton]}
                    titleStyle={styles.optOutButtonTitle}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    optOutContainer: {
        marginTop: 50,
    },
    optOutTitle: {
        ...commonStyles.subject,
    },
    optOutInnerContainer: {
        borderRadius: 15,
        padding: 20,
        gap: 2,
    },
    optOutCaution: {
        opacity: 0.5,
        fontSize: 13,
    },
    optOutButton: {
        marginTop: 15,
    },
    optOutButtonTitle: {
        color: '#FFF',
    },
});

export default OptOutCautionView;
