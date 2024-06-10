import React, { ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import PushAnimatedPressable from './PushAnimatedPressable';
import VectorIcon from './VectorIcon';

import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';
import { HORIZONTAL_GAP } from '../../constant/style';
import HorizontalDivider from './HorizontalDivider';

type Props = {
    screenTitle: string;
    goBack?: () => void;

    leftComponent?: ReactNode;
    rightComponent?: ReactNode;
};

const InnerNavigationBar = (props: Props) => {
    const { hp, wp } = useDimensions();
    const { colors } = useCustomTheme();
    const { screenTitle, goBack, leftComponent, rightComponent } = props;

    return (
        <View>
            <View style={styles.container}>
                {leftComponent && <View>{leftComponent}</View>}

                {goBack && (
                    <PushAnimatedPressable onPress={goBack} style={styles.goBackBtnContainer}>
                        <VectorIcon name={'chevron-left'} size={20} color={colors.text} />
                        <CustomText style={styles.goBackBtnText}>뒤로</CustomText>
                    </PushAnimatedPressable>
                )}

                <View style={{ flex: 1 }} />
                <View
                    style={[{ width: wp(100) }, styles.screenTitleContainer]}
                    pointerEvents="none"
                >
                    <CustomText style={styles.screenTitle}>{screenTitle}</CustomText>
                </View>

                {rightComponent && <View style={{ alignItems: 'flex-end' }}>{rightComponent}</View>}
            </View>
            <HorizontalDivider
                style={[{ opacity: 1 }, styles.divider]}
                color={colors.tabBarBackground}
                width={wp(100) - HORIZONTAL_GAP * 2}
                height={2}
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
