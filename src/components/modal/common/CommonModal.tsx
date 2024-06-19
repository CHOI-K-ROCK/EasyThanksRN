import React, { useCallback } from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, withTiming } from 'react-native-reanimated';
import CustomText from '../../common/CustomText';

import FullWidthButton from '../../common/FullWidthButton';

import { ModalType } from '../../../@types/models/modal';

import useCustomTheme from '../../../hooks/useCustomTheme';
import useDimensions from '../../../hooks/useDimensions';
import useKeyboard from '../../../hooks/useKeyboard';

import { commonStyles } from '../../../style';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CommonModal = (props: ModalType) => {
    const { wp, hp } = useDimensions();
    const { colors } = useCustomTheme();

    const { isShow, dismiss, keyboardHeight } = useKeyboard();

    const {
        buttons,

        backdrop = true,
        onPressBackdrop,

        text,
        children,
    } = props;

    // variables

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    // animation

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
                backgroundColor = IS_CANCEL_BUTTON ? colors.caution : colors.text,
                textColor = IS_CANCEL_BUTTON ? '#FFF' : colors.textReverse,
            } = button;

            const buttonHandler = () => {
                onPress && onPress();
            };

            return (
                <FullWidthButton
                    key={buttonContent}
                    title={buttonContent}
                    onPress={buttonHandler}
                    titleStyle={{ color: textColor }}
                    style={{ backgroundColor, flex: 1 }}
                />
            );
        });
    }, [buttons, colors.caution, colors.text, colors.textReverse]);

    return (
        <View
            style={[
                StyleSheet.absoluteFill,
                commonStyles.centered,
                { zIndex: 999, bottom: keyboardHeight },
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
                        maxWidth: 320,
                        minHeight: hp(25),
                        backgroundColor: '#000',
                    },
                ]}
            >
                {text && <CustomText>{text}</CustomText>}
                {children}

                <View style={[commonStyles.rowCenter, styles.buttonContainer]}>
                    {renderButtons()}
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 10,
    },
});

export default CommonModal;
