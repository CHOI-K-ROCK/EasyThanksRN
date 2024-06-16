import React, { useCallback, useEffect, useState } from 'react';

import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import CustomText from '../common/CustomText';
import FullWidthButton from '../common/FullWidthButton';
import { Pressable, StyleSheet, View } from 'react-native';

import { ModalDataTypeWithId } from '../../@types/models/modal';

import useModal from '../../hooks/useModal';
import useDimensions from '../../hooks/useDimensions';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = ModalDataTypeWithId & { type: 'dialog' };

const Dialog = (props: Props) => {
    const { closeModal } = useModal();
    const { wp, hp } = useDimensions();

    const { content, id, buttons, backdrop = true, closingByBackdrop = true } = props;

    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setVisible(true); // 최초 렌더링시 애니메이션 재생을 위한 상태 변경
    }, []);

    // animation

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

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
            closeModal(id);
        }, 300);
    }, [closeModal, id]);

    const handlePressBackdrop = useCallback(() => {
        if (closingByBackdrop) {
            handleCloseModal();
        }
    }, [closingByBackdrop, handleCloseModal]);

    // ui

    const renderButton = useCallback(() => {
        return buttons?.map(button => {
            const {
                content: buttonContent,
                onPress,
                backgroundColor = '#FFF',
                textColor,
                isCloseButton,
            } = button;

            const buttonHandler = isCloseButton ? handleCloseModal : onPress;

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
        <View style={styles.container}>
            <AnimatedPressable
                style={[
                    { backgroundColor: backdrop ? 'rgba(0,0,0,0.4)' : undefined },
                    styles.backdrop,
                    animatedOpacity,
                ]}
                onPress={handlePressBackdrop}
            />
            <Animated.View
                style={[
                    {
                        width: wp(70),
                        height: hp(20),
                        backgroundColor: '#000',
                    },
                    animatedOpacity,
                    animatedAppear,
                ]}
            >
                <CustomText onPress={handleCloseModal}>{content}</CustomText>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                    {renderButton()}
                </View>
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: 0,
    },
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default Dialog;
