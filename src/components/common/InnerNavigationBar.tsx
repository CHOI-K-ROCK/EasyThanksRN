import React from 'react';

import { StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import PushAnimatedPressable from './PushAnimatedPressable';
import VectorIcon from './VectorIcon';

import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';
import { HORIZONTAL_GAP } from '../../constant/style';

type Props = {
    screenTitle: string;
    goBack: () => void;
};

const InnerNavigationBar = (props: Props) => {
    const { hp, wp } = useDimensions();
    const { colors } = useCustomTheme();
    const { screenTitle, goBack } = props;

    console.log(new Date());

    return (
        <View style={{ marginBottom: hp(2) }}>
            <View style={styles.container}>
                <PushAnimatedPressable onPress={goBack} style={styles.goBackBtnContainer}>
                    <VectorIcon name={'chevron-left'} size={20} color={colors.text} />
                    <CustomText style={styles.goBackBtnText}>뒤로</CustomText>
                </PushAnimatedPressable>

                <View
                    style={[{ width: wp(100) }, styles.screenTitleContainer]}
                    pointerEvents="none"
                >
                    <CustomText style={styles.screenTitle}>{screenTitle}</CustomText>
                </View>
            </View>

            <View
                style={[
                    {
                        backgroundColor: colors.tabBarBackground,
                        width: wp(100) - HORIZONTAL_GAP * 2,
                    },
                    styles.divider,
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 15,
    },
    goBackBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    goBackBtnText: {
        fontSize: 15,
        fontWeight: 600,
    },
    screenTitleContainer: {
        position: 'absolute',
    },
    screenTitle: {
        fontSize: 19,
        fontWeight: 600,

        alignItems: 'center',
        textAlign: 'center',
    },
    divider: {
        height: 2,
        alignSelf: 'center',
    },
});

export default InnerNavigationBar;
