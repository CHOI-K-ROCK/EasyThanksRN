import React, { ReactNode, useCallback, useEffect, useState } from 'react';

import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CustomText from '../../common/CustomText';
import FullWidthButton from '../../common/FullWidthButton';
import { Pressable, StyleSheet, View } from 'react-native';

import { ModalButtonType, ModalDataTypeWithId } from '../../../@types/models/modal';

import useModal from '../../../hooks/useModal';
import useDimensions from '../../../hooks/useDimensions';

import { commonStyles } from '../../../style';
import useKeyboard from '../../../hooks/useKeyboard';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
    buttons?: ModalButtonType[];

    backdrop?: boolean;
    closingByBackdrop?: boolean;

    onOpen?: () => void;
    onClose?: () => void;

    closeModal: () => void;

    children: ReactNode;
};

const CommonModal = (props: Props) => {
    const { wp, hp } = useDimensions();

    const { isShow, dismiss, keyboardHeight } = useKeyboard();

    const {
        buttons,

        backdrop = true,
        closingByBackdrop = true,

        onOpen,
        onClose,

        children,
        closeModal,
    } = props;

    const [visible, setVisible] = useState<boolean>(false);

    // variables

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    useEffect(() => {
        setVisible(true); // 최초 렌더링시 애니메이션 재생을 위한 상태 변경
        onOpen && onOpen();
    }, [onOpen]);

    // animation

    const animatedOpacity = useAnimatedStyle(
        () => ({
            opacity: withTiming(visible ? 1 : 0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
        }),
        [visible]
    );

    const animatedAppear = useAnimatedStyle(
        () => ({
            transform: [
                {
                    translateY: withTiming(visible ? 0 : 15, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
            ],
        }),
        [visible]
    );

    // handler

    const handleCloseModal = useCallback(() => {
        setVisible(false);
        setTimeout(() => {
            closeModal();
            onClose && onClose();
        }, ANIMATION_DURATION);
    }, [closeModal, onClose]);

    const handlePressBackdrop = useCallback(() => {
        if (isShow) {
            dismiss();
            return;
        }
        if (closingByBackdrop) {
            handleCloseModal();
        }
    }, [closingByBackdrop, dismiss, handleCloseModal, isShow]);

    // ui

    const renderButtons = useCallback(() => {
        return buttons?.map(button => {
            const {
                content: buttonContent,
                onPress,
                backgroundColor = '#FFF',
                textColor,
                isCloseButton,
            } = button;

            const buttonHandler = () => {
                if (isCloseButton && !onPress) {
                    handleCloseModal();
                }

                if (onPress) {
                    onPress(handleCloseModal);
                }
            };

            if (typeof buttonContent === 'string') {
                return (
                    <FullWidthButton
                        key={buttonContent}
                        title={buttonContent}
                        onPress={buttonHandler}
                        titleStyle={{ color: textColor }}
                        style={{ backgroundColor, flex: 1 }}
                    />
                );
            }

            return buttonContent;
        });
    }, [buttons, handleCloseModal]);

    return (
        <View style={[StyleSheet.absoluteFill, commonStyles.centered, { bottom: keyboardHeight }]}>
            <AnimatedPressable
                style={[
                    { backgroundColor: backdrop ? 'rgba(0,0,0,0.4)' : undefined },
                    StyleSheet.absoluteFill,
                    animatedOpacity,
                ]}
                onPress={handlePressBackdrop}
            />
            <Animated.View
                style={[
                    {
                        width: wp(75),
                        maxWidth: 320,
                        minHeight: hp(25),
                        backgroundColor: '#000',
                    },
                    animatedOpacity,
                    animatedAppear,
                ]}
            >
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
