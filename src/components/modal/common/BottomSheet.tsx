import React, { ReactElement, useState } from 'react';

import { LayoutChangeEvent, Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useDimensions from 'hooks/useDimensions';
import useCustomTheme from 'hooks/useCustomTheme';

type Props = {
    visible: boolean;
    children: ReactElement;
    onPressBackdrop: () => void;
    rawElement?: boolean;
};

const AnimatedPressble = Animated.createAnimatedComponent(Pressable);

const BottomSheet = (props: Props) => {
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();
    const { colors } = useCustomTheme();

    const { children, visible = false, onPressBackdrop, rawElement = false } = props;

    const [sheetHeight, setSheetHeight] = useState<number>(0);

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
                    translateY: withTiming(visible ? -sheetHeight : 0, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        };
    }, [visible, sheetHeight]);

    return (
        <View style={[StyleSheet.absoluteFill]} pointerEvents={visible ? 'auto' : 'none'}>
            <AnimatedPressble
                onPress={onPressBackdrop}
                style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100 },
                    animatedOpacity,
                ]}
            />
            <Animated.View
                style={[
                    {
                        top: hp(100),
                        zIndex: 100,
                    },
                    animatedAppear,
                ]}
                onLayout={_onLayout}
            >
                {rawElement ? (
                    <View>{children}</View>
                ) : (
                    <Animated.View
                        style={[
                            {
                                backgroundColor: colors.caution,
                                paddingBottom: bottom,
                            },
                            styles.contentContainer,
                        ]}
                    >
                        <Animated.View style={animatedContentOpacity}>{children}</Animated.View>
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    contentContainer: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        paddingTop: 30,
    },
});

export default BottomSheet;
