import React, { useCallback } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    withTiming,
    useAnimatedKeyboard,
    useAnimatedStyle,
} from 'react-native-reanimated';
import CustomText from 'components/common/CustomText';

import FullWidthButton from 'components/common/FullWidthButton';

import { ModalType } from 'types/models/modal';

import useCustomTheme from 'hooks/useCustomTheme';
import useDimensions from 'hooks/useDimensions';
import useKeyboard from 'hooks/useKeyboard';

import { commonStyles } from 'styles';
import HorizontalDivider from 'components/common/HorizontalDivider';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CommonModal = (props: ModalType) => {
    const { wp, hp } = useDimensions();
    const { colors } = useCustomTheme();

    const { isShow, dismiss } = useKeyboard();
    const { height } = useAnimatedKeyboard();

    const {
        buttons,

        backdrop = true,
        onPressBackdrop,

        title,
        text,
        children,
    } = props;

    // variables

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    // animation
    const animatedBottom = useAnimatedStyle(() => ({
        bottom: height.value,
    }));

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
        if (isShow) {
            dismiss();
            return;
        }
        backdrop && onPressBackdrop && onPressBackdrop();
    }, [backdrop, dismiss, isShow, onPressBackdrop]);

    // ui

    const renderButtons = useCallback(() => {
        return buttons?.map(button => {
            const IS_CANCEL_BUTTON = button.type === 'cancel';

            const {
                content: buttonContent,
                onPress,
                backgroundColor = IS_CANCEL_BUTTON ? colors.warning : colors.text,
                textColor = IS_CANCEL_BUTTON ? '#FFF' : colors.textReverse,
                disabled,
            } = button;

            const buttonHandler = () => {
                onPress && onPress();
            };

            return (
                <FullWidthButton
                    disabled={disabled}
                    key={buttonContent}
                    title={buttonContent}
                    onPress={buttonHandler}
                    titleStyle={{ color: textColor }}
                    style={{ backgroundColor, flex: 1 }}
                />
            );
        });
    }, [buttons, colors]);

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
                {title && (
                    <View>
                        <CustomText style={styles.title}>{title}</CustomText>
                        <HorizontalDivider style={styles.divider} />
                    </View>
                )}

                {text && (
                    <View
                        style={{
                            minHeight: children ? hp(2) : hp(14),
                            justifyContent: 'center',
                        }}
                    >
                        <CustomText style={styles.text}>{text}</CustomText>
                    </View>
                )}

                {children}

                <View style={styles.buttonContainer}>{renderButtons()}</View>
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
    buttonContainer: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    divider: {
        marginTop: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 25,
        paddingVertical: 20,
    },
});

export default CommonModal;
