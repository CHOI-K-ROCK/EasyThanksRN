import React, {
    ReactNode,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';

import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import FullWidthButton from '../../common/FullWidthButton';

import { ModalButtonType } from '../../../@types/models/modal';

import useDimensions from '../../../hooks/useDimensions';
import useKeyboard from '../../../hooks/useKeyboard';

import { commonStyles } from '../../../style';
import useCustomTheme from '../../../hooks/useCustomTheme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
    buttons?: ModalButtonType[];

    backdrop?: boolean;
    closingByBackdrop?: boolean;

    closeModal: () => void;

    children: ReactNode;
};

const CommonModal = forwardRef((props: Props, ref) => {
    const { wp, hp } = useDimensions();
    const { colors } = useCustomTheme();

    const { isShow, dismiss, keyboardHeight } = useKeyboard();

    const {
        buttons,

        backdrop = true,
        closingByBackdrop = true,

        children,
        closeModal,
    } = props;

    const [visible, setVisible] = useState<boolean>(false);

    // variables

    const ANIMATION_DURATION = 200;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);

    useEffect(() => {
        setVisible(true); // 최초 렌더링시 애니메이션 재생을 위한 상태 변경
    }, []);

    // 부모 컴포넌트에서 애니메이션 시간만큼 지연된 closeModal 을 호출해야하는 경우 사용
    useImperativeHandle(ref, () => ({
        animatedCloseModal: handleCloseModal,
    }));

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
        }, ANIMATION_DURATION);
    }, [closeModal]);

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
            const IS_CANCEL_BUTTON = button.type === 'cancel';

            const {
                content: buttonContent,
                onPress,
                backgroundColor = IS_CANCEL_BUTTON ? colors.caution : colors.text,
                textColor = IS_CANCEL_BUTTON ? '#FFF' : colors.textReverse,
            } = button;

            const buttonHandler = () => {
                onPress ? onPress() : handleCloseModal();
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
    }, [buttons, colors.caution, colors.text, colors.textReverse, handleCloseModal]);

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
});

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 10,
    },
});

export default CommonModal;
