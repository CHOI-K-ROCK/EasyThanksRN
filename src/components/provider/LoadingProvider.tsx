import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';
import CustomText from '../common/CustomText';

import Animated, { withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';

import { commonStyles } from '../../style';

import { useAtomValue } from 'jotai';
import { isLoadingAtom } from '../../state/ui';

const LoadingProvider = () => {
    const loadingState = useAtomValue(isLoadingAtom);

    return loadingState && <LoadingOverlay />;
};

// ---- components ----

const LoadingOverlay = () => {
    const { wp } = useDimensions();
    const { colors } = useCustomTheme();

    const LOADING_DOTS_AMOUNT = 5;

    const initAnimation = useCallback((idx: number) => {
        return () => {
            'worklet';

            const TOTAL_DURATION = 1000;
            const DELAY = 200 * idx;

            const animations = {
                transform: [
                    {
                        // 시작 딜레이 - 반복 - 순차 재생(반복 딜레이 + 상승애니메이션, 하강애니메이션)
                        // 반복해서 재생될 애니메이션(1초 간격으로 상승 / 하강)을 각 인덱스마다 지연실행 하는 것
                        translateY: withDelay(
                            DELAY,
                            withRepeat(
                                withSequence(
                                    withTiming(-7),
                                    withTiming(0),
                                    withDelay(TOTAL_DURATION, withTiming(0))
                                ),
                                -1
                            )
                        ),
                    },
                ],
            };
            const initialValues = {
                transform: [{ translateY: 0 }],
            };

            return { animations, initialValues };
        };
    }, []);

    return (
        <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop]}>
            <View
                style={[
                    {
                        width: wp(25),
                        height: wp(25),
                        backgroundColor: colors.tabBarBackground + '90',
                    },
                    styles.loadingContainer,
                ]}
            >
                <View style={styles.indicatorContainer}>
                    {Array.from({ length: LOADING_DOTS_AMOUNT }).map((_, idx) => {
                        return (
                            <Animated.View
                                key={idx}
                                entering={initAnimation(idx)}
                                style={[styles.indicator]}
                            />
                        );
                    })}
                </View>
                <CustomText style={styles.text}>{'잠시만\n기다려주세요'}</CustomText>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        ...commonStyles.centered,
    },
    loadingContainer: {
        maxHeight: 150,
        maxWidth: 150,
        borderRadius: 15,
        ...commonStyles.centered,
    },
    indicatorContainer: {
        flexDirection: 'row',
        gap: 5,
        marginTop: 20,
        marginBottom: 10,
    },
    indicator: {
        width: 8,
        aspectRatio: 1,
        backgroundColor: '#FFF',
        borderRadius: 999,
    },
    text: {
        textAlign: 'center',
        fontSize: 11,
        fontWeight: 500,
        opacity: 0.7,
    },
});

export default LoadingProvider;
