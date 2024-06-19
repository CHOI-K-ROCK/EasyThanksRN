import React, { useCallback, useEffect, useRef, useState } from 'react';

import { View } from 'react-native';
import CustomText from '../common/CustomText';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import useDimensions from '../../hooks/useDimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { commonStyles } from '../../style';
import VectorIcon from '../common/VectorIcon';
import { delay } from '../../utils/data';
import { ToastDataType } from './ToastManager';
import useToast from '../../hooks/useToast';

const Toast = (props: ToastDataType) => {
    const { closeModal } = useToast();
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();

    const { id, content, duration = 3000 } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [messageSize, setMessageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    const animatedTimer = useRef<NodeJS.Timeout | null>(null);
    const durationTimer = useRef<NodeJS.Timeout | null>(null);

    // variables

    const ANIMATION_DURATION = 300;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);
    const APPEAR_HEIGHT = bottom + hp(10);

    useEffect(() => {
        const handleToast = async () => {
            setVisible(true);

            await new Promise(res => (animatedTimer.current = setTimeout(res, ANIMATION_DURATION)));
            await new Promise(res => (durationTimer.current = setTimeout(res, duration)));

            setVisible(false);
            await new Promise(res => (animatedTimer.current = setTimeout(res, ANIMATION_DURATION)));
            closeModal(id!);
        };

        handleToast();

        return () => {
            clearTimeout(animatedTimer.current as NodeJS.Timeout);
            clearTimeout(durationTimer.current as NodeJS.Timeout);
        };
    }, [closeModal, duration, id]);

    // animation

    const animatedAppear = useAnimatedStyle(() => {
        return {
            opacity: withTiming(visible ? 1 : 0, {
                duration: ANIMATION_DURATION,
                easing: EASING_BEZIER,
            }),
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

    const handleCloseModal = useCallback(async () => {
        clearTimeout(animatedTimer.current as NodeJS.Timeout);
        clearTimeout(durationTimer.current as NodeJS.Timeout);

        setVisible(false);
        await delay(ANIMATION_DURATION);

        closeModal(id!);
    }, [closeModal, id]);

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

// 키보드 훅은 context - provider 로 확장 * 1
// 전체 View 에서 동일한 값을 가져오지 못하는 문제 해결을 위함. *
