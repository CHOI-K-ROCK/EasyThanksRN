import React from 'react';
import { StyleSheet, View } from 'react-native';

import CustomText from 'components/common/CustomText';

import { commonStyles } from 'style';

import useDimensions from 'hooks/useDimensions';
import useCustomTheme from 'hooks/useCustomTheme';
import { convertDateToString } from 'utils/date';
import { getRandomArrayValue } from 'utils/data';

import { EMOJI_SET } from 'constant/string';

type Props = {
    leftComponent?: React.ReactElement;
};

const MainNavigationBar = (props: Props) => {
    const { wp, hp } = useDimensions();
    const { colors } = useCustomTheme();

    const { leftComponent } = props;

    return (
        <View
            style={[
                {
                    backgroundColor: colors.tabBarBackground,
                    paddingHorizontal: wp(5),
                    paddingTop: hp(0.5),
                    paddingBottom: hp(1.5),
                },
                styles.container,
            ]}
        >
            <View style={{ flex: 1 }}>
                <View style={styles.nicknameContainer}>
                    <CustomText style={styles.nickname}>KROCK</CustomText>
                    <View style={styles.welcomeWrapper}>
                        <CustomText style={styles.welcome}>{'님 어서오세요!'}</CustomText>
                        <CustomText style={styles.emoji}>
                            {getRandomArrayValue(EMOJI_SET)}
                        </CustomText>
                    </View>
                </View>
                <CustomText style={styles.currentDate}>
                    {convertDateToString(new Date())}
                </CustomText>
            </View>

            {leftComponent && leftComponent}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        ...commonStyles.dropShadow,
    },
    nicknameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    nickname: {
        fontSize: 26,
        fontWeight: 600,
    },
    welcomeWrapper: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    welcome: {
        fontSize: 16,
        marginLeft: 5,
    },
    emoji: {
        marginLeft: 5,
    },
    currentDate: {
        fontSize: 14,
        fontWeight: 400,
        opacity: 0.5,
    },
});

export default MainNavigationBar;
