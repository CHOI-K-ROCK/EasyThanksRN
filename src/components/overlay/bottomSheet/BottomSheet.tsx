import React, { useCallback, useEffect, useState } from 'react';

import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDimensions from 'hooks/useDimensions';
import useCustomTheme from 'hooks/useCustomTheme';
import { BottomSheetType } from 'types/models/bottomSheet';
import CustomText from 'components/common/CustomText';
import VectorIcon from 'components/common/VectorIcon';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';

const AnimatedPressble = Animated.createAnimatedComponent(Pressable);

const BottomSheet = (props: BottomSheetType) => {
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();
    const { colors } = useCustomTheme();

    const {
        children,
        closeBottomSheet,
        closeButton = true,
        closeByBackdrop = true,
        rawElement,
    } = props;

    const [visible, setVisible] = useState<boolean>(false);

    const [sheetHeight, setSheetHeight] = useState<number>(0);

    useEffect(() => {
        setVisible(true);
        // 초기 애니메이션 재생
    }, []);

    const _onLayout = (e: LayoutChangeEvent) => {
        setSheetHeight(e.nativeEvent.layout.height);
    };

    const ANIMATION_DURATION = 300;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    // entering 을 사용안하는 이유
    // entering 애니메이션 메소드가 생성되고 적용되는 타이밍 보다
    // sheetHeight 설정되는 타이밍이 늦으므로, 정상적인 동작 X

    const animatedOpacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(visible ? 1 : 0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
        };
    }, [visible]);

    const animatedContentOpacity = useAnimatedStyle(() => {
        return {
            opacity: withTiming(visible ? 1 : 0, {
                duration: visible ? 500 : 100,
                easing: EASING_BEZIER,
            }),
        };
    }, [visible]);

    const animatedAppear = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(-sheetHeight, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        };
    }, [sheetHeight]);

    const backdropExiting = useCallback(() => {
        'worklet';
        const animations = {
            opacity: withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
        };
        const initialValues = {
            opacity: 1,
        };

        return { animations, initialValues };
    }, [EASING_BEZIER]);

    const bottomSheetExiting = useCallback(() => {
        'worklet';
        const animations = {
            transform: [
                {
                    translateY: withTiming(0, {
                        duration: 300,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        };
        const initialValues = {
            transform: [{ translateY: -sheetHeight }],
        };

        return { animations, initialValues };
    }, [EASING_BEZIER, sheetHeight]);

    const contentExiting = useCallback(() => {
        'worklet';

        const animations = {
            opacity: withTiming(0, {
                duration: 100,
                easing: EASING_BEZIER,
            }),
            temp: withTiming(0),
            // 위의 duration 이 종료되는 경우 컴포넌트가 언마운트되므로,
            // 임시 속성으로 언마운트 지연
        };
        const initialValues = {
            opacity: 1,
            temp: 0,
        };
        return { animations, initialValues };
    }, [EASING_BEZIER]);

    const handleBackdropPress = () => {
        closeByBackdrop && closeBottomSheet();
    };

    return (
        <View style={[StyleSheet.absoluteFill, { zIndex: 999 }]}>
            <AnimatedPressble
                onPress={handleBackdropPress}
                exiting={backdropExiting}
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 999 },
                    animatedOpacity,
                ]}
            />
            <Animated.View
                exiting={bottomSheetExiting}
                style={[
                    {
                        top: hp(100),
                        zIndex: 999,
                    },
                    animatedAppear,
                ]}
                onLayout={_onLayout}
            >
                {rawElement ? ( // 요소 그대로 표시
                    <View>{children}</View>
                ) : (
                    <View>
                        {closeButton && <BottomSheetCloseButton onPress={closeBottomSheet} />}
                        {/* container */}
                        <Animated.View
                            style={[
                                {
                                    backgroundColor: colors.tabBarBackground,
                                    paddingBottom: bottom,
                                },
                                styles.contentContainer,
                            ]}
                        >
                            {/* content */}
                            <Animated.View
                                exiting={contentExiting}
                                style={[animatedContentOpacity]}
                            >
                                {children}
                            </Animated.View>
                        </Animated.View>
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

// deps components

const BottomSheetCloseButton = ({ onPress }: { onPress: () => void }) => {
    return (
        <PushAnimatedPressable onPress={onPress} style={styles.closeButtonContainer}>
            <CustomText style={styles.closeButtonText}>{'닫기'}</CustomText>
            <VectorIcon name="close" color={'#FFF'} />
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {},
    contentContainer: {
        borderTopEndRadius: 15,
        borderTopStartRadius: 15,
        paddingTop: 15,
    },
    closeButtonContainer: {
        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 5,
    },
    closeButtonText: {
        color: '#FFF',
        fontWeight: 600,
    },
});

export default BottomSheet;
