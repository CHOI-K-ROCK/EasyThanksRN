import React, { useCallback, useEffect, useState } from 'react';

import { View } from 'react-native';
import CustomText from '../common/CustomText';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { ModalToastDataType } from '../../@types/models/modal';

import useModal from '../../hooks/useModal';
import useDimensions from '../../hooks/useDimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { commonStyles } from '../../style';
import VectorIcon from '../common/VectorIcon';

const Toast = (props: ModalToastDataType) => {
    const { closeModal } = useModal();
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();

    const { id, content, duration = 1000 } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [messageSize, setMessageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    const handleCloseModal = useCallback(() => {
        setVisible(false);
        const closeTimer = setTimeout(() => {
            closeModal(id);
        }, ANIMATION_DURATION);
    }, [closeModal, id]);

    useEffect(() => {
        setVisible(true); // 최초 렌더링시 애니메이션 재생을 위한 상태 변경

        const toastTimer = setTimeout(() => {
            console.log('times up');
            handleCloseModal();
        }, (duration || 0) + ANIMATION_DURATION);

        return () => {
            clearTimeout(toastTimer);
        };
    }, [duration, handleCloseModal]);

    // animation

    const ANIMATION_DURATION = 300;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);
    const APPEAR_HEIGHT = bottom + hp(10);

    const animatedOpacity = useAnimatedStyle(
        () => ({
            opacity: withTiming(visible ? 1 : 0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
        }),
        [visible]
    );

    const animatedAppear = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withTiming(visible ? 0 : APPEAR_HEIGHT, {
                        duration: ANIMATION_DURATION,
                        easing: EASING_BEZIER,
                    }),
                },
                { translateX: -messageSize.w / 2 },
            ],
        };
    }, [visible, messageSize]);

    // handler

    // ui

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    bottom: APPEAR_HEIGHT,
                    left: '50%',
                    backgroundColor: '#000',
                    paddingLeft: 15,
                    paddingRight: 10,
                    gap: 5,

                    paddingVertical: 13,
                    borderRadius: 10,
                },
                commonStyles.dropShadow,
                commonStyles.rowCenter,
                animatedOpacity,
                animatedAppear,
            ]}
            onLayout={e => {
                const { height, width } = e.nativeEvent.layout;
                setMessageSize({ h: height, w: width });
            }}
        >
            <CustomText style={{ fontWeight: 600, fontSize: 15 }}>{content}</CustomText>
            <VectorIcon
                name="close"
                color={'#000'}
                style={{
                    backgroundColor: '#FFF',
                    borderRadius: 999,
                    padding: 5,
                }}
                onPress={handleCloseModal}
            />
        </Animated.View>
    );
};

export default Toast;
