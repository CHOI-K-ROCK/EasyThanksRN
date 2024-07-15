import React, { ReactElement, useCallback } from 'react';

import { Pressable, StyleSheet } from 'react-native';
import Animated, {
    Easing,
    withTiming,
    useAnimatedKeyboard,
    useAnimatedStyle,
} from 'react-native-reanimated';

import useCustomTheme from 'hooks/useCustomTheme';
import useDimensions from 'hooks/useDimensions';
import useKeyboard from 'hooks/useKeyboard';

import { commonStyles } from 'styles';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type Props = {
    backdrop?: boolean;
    onPressBackdrop?: () => void;

    children?: ReactElement;
};

const Modal = (props: Props) => {
    const { wp } = useDimensions();
    const { colors } = useCustomTheme();

    const { dismiss } = useKeyboard();
    const { height: keyboardHeight, state: keyboardState } = useAnimatedKeyboard({
        isStatusBarTranslucentAndroid: true,
        // 안드로이드 모달 오픈 시 레이아웃 플리커링 오류 수정
        // isStatusBarTranslucentAndroid
        // -> 키보드가 열릴때 안드로이드 기기의 상태바를 뷰의 높이에 포함하느냐 / 안하냐.
        // 현재 모달이 최상위 화면에서 덮듯 렌더링되는데, 해당 옵션이 false 인 경우 화면 높이를 계산하는 과정에서 해당 문제가 발생하는 것이 아닌가 하고 추측
        // true 인 경우 온전히 뷰의 높이를 가져다가 쓸 수 있으므로, 플리커링 문제가 생기지 않는다고 추측.
        // useKeyboard 훅에 포함시키는 것은 고려 후 실행
    });

    const {
        backdrop = true,
        onPressBackdrop,

        children,
    } = props;

    // variables

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    // animation

    const animatedBottom = useAnimatedStyle(() => {
        return {
            bottom: keyboardHeight.value,
        };
    });

    const backdropEntering = useCallback(() => {
        'worklet';
        const animations = {
            opacity: withTiming(1, { duration: ANIMATION_DURATION, easing: EASING_BEZIER }),
        };
        const initialValues = {
            opacity: 0,
        };
        return { animations, initialValues };
    }, [EASING_BEZIER]);

    const backdropExiting = useCallback(() => {
        'worklet';
        const animations = {
            opacity: withTiming(0, { duration: ANIMATION_DURATION, easing: EASING_BEZIER }),
        };
        const initialValues = {
            opacity: 1,
        };
        return { animations, initialValues };
    }, [EASING_BEZIER]);

    const modalEntering = useCallback(() => {
        'worklet';
        const animations = {
            opacity: withTiming(1, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
            transform: [
                {
                    translateY: withTiming(0, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        };
        const initialValues = {
            opacity: 0,
            transform: [{ translateY: 15 }],
        };
        return { animations, initialValues };
    }, [EASING_BEZIER]);

    const modalExiting = useCallback(() => {
        'worklet';
        const animations = {
            opacity: withTiming(0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
            transform: [
                {
                    translateY: withTiming(15, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        };
        const initialValues = {
            opacity: 1,
            transform: [{ translateY: 0 }],
        };
        return { animations, initialValues };
    }, [EASING_BEZIER]);

    // handler

    const handlePressBackdrop = useCallback(() => {
        if (keyboardState.value === 1 || keyboardState.value === 2) {
            // appearing, appear
            dismiss();
            return;
        }
        backdrop && onPressBackdrop && onPressBackdrop();
    }, [backdrop, dismiss, keyboardState, onPressBackdrop]);

    return (
        <Animated.View
            style={[
                StyleSheet.absoluteFill,
                commonStyles.centered,
                { zIndex: 999 },
                animatedBottom,
            ]}
        >
            <AnimatedPressable
                entering={backdropEntering}
                exiting={backdropExiting}
                style={[
                    { backgroundColor: backdrop ? 'rgba(0,0,0,0.4)' : undefined },
                    StyleSheet.absoluteFill,
                ]}
                onPress={handlePressBackdrop}
            />
            <Animated.View
                entering={modalEntering}
                exiting={modalExiting}
                style={[
                    {
                        width: wp(75),
                        backgroundColor: colors.background,
                    },
                    styles.container,
                ]}
            >
                {children}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        maxWidth: 320,

        padding: 15,
        borderRadius: 15,
        ...commonStyles.dropShadow,
    },
});

export default Modal;
