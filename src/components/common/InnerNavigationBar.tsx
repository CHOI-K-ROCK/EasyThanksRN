import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomText from './CustomText';
import VectorIcon from './VectorIcon';
import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';
import PushAnimatedPressable from './PushAnimatedPressable';

type Props = {
    goBack: () => void;
};

const InnerNavigationBar = (props: Props) => {
    const { hp } = useDimensions();
    const { colors } = useCustomTheme();
    const { goBack } = props;

    return (
        <View style={[{ marginBottom: hp(2), backgroundColor: colors.tabBarBackground }, styles.container]}>
            <PushAnimatedPressable onPress={goBack} style={styles.goBackBtnContainer}>
                <VectorIcon name={'chevron-left'} size={25} color={colors.text} />
                <CustomText style={styles.goBackBtnText}>뒤로</CustomText>
            </PushAnimatedPressable>

            <CustomText style={[{ position: 'absolute', left: '50%' }, styles.screenTitle]}>메뉴</CustomText>
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
    screenTitle: {
        fontSize: 19,
        fontWeight: 600,
    },
});

export default InnerNavigationBar;
