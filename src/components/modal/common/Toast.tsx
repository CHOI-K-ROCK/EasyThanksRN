import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ColorValue, StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import VectorIcon from 'components/common/VectorIcon';

import useDimensions from 'hooks/useDimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToastType } from 'types/models/toast';

import { delay } from 'utils/data';
import useToast from 'hooks/useToast';
import useCustomTheme from 'hooks/useCustomTheme';

import { commonStyles } from 'styles';
import useKeyboard from 'hooks/useKeyboard';

const Toast = (props: ToastType) => {
    const { closeToast } = useToast();
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();
    const { colors } = useCustomTheme();
    const { keyboardHeight } = useKeyboard();

    const { type = 'common', id, text, component, duration = 2000, top } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [messageSize, setMessageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    const animatedTimer = useRef<NodeJS.Timeout | null>(null);
    const durationTimer = useRef<NodeJS.Timeout | null>(null);

    // variables

    const ANIMATION_DURATION = 300;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);
    const APPEAR_HEIGHT = keyboardHeight + bottom;

    useEffect(() => {
        const handleToast = async () => {
            setVisible(true);

            await new Promise(res => (animatedTimer.current = setTimeout(res, ANIMATION_DURATION)));
            await new Promise(res => (durationTimer.current = setTimeout(res, duration)));

            setVisible(false);
            await new Promise(res => (animatedTimer.current = setTimeout(res, ANIMATION_DURATION)));
            closeToast(id);
        };

        handleToast();

        return () => {
            clearTimeout(animatedTimer.current as NodeJS.Timeout);
            clearTimeout(durationTimer.current as NodeJS.Timeout);
        };
    }, [closeToast, duration, id]);

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

    const handlecloseToast = useCallback(async () => {
        clearTimeout(animatedTimer.current as NodeJS.Timeout);
        clearTimeout(durationTimer.current as NodeJS.Timeout);

        setVisible(false);
        await delay(ANIMATION_DURATION);

        closeToast(id);
    }, [closeToast, id]);

    // ui

    const renderIcon = useCallback(() => {
        let name: string = '';
        let backgroundColor: ColorValue = '#000';

        switch (type) {
            case 'complete': {
                name = 'check';
                backgroundColor = colors.complete;
                break;
            }
            case 'caution': {
                name = 'exclamation';
                backgroundColor = colors.caution;
                break;
            }
            case 'error': {
                name = 'close';
                backgroundColor = colors.warning;
                break;
            }
            case 'common': {
                return <></>;
            }
        }

        return (
            <VectorIcon
                name={name}
                color={'#FFF'}
                size={17}
                style={[
                    {
                        backgroundColor,
                    },
                    styles.typeIcon,
                ]}
            />
        );
    }, [colors, type]);

    return (
        <Animated.View
            style={[
                {
                    bottom: APPEAR_HEIGHT,
                    backgroundColor: colors.toastBackground,
                },
                styles.container,
                commonStyles.rowCenter,
                animatedAppear,
            ]}
            onLayout={e => {
                const { height, width } = e.nativeEvent.layout;
                setMessageSize({ h: height, w: width });
            }}
        >
            <View style={[commonStyles.rowCenter, { gap: 10 }]}>
                {renderIcon()}
                {text && <CustomText style={styles.text}>{text}</CustomText>}
                {component && component}
                <VectorIcon
                    name="close"
                    color={'#000'}
                    size={15}
                    style={styles.closeButton}
                    onPress={handlecloseToast}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    typeIcon: {
        borderRadius: 6,
        padding: 2,
    },
    container: {
        position: 'absolute',
        left: '50%',
        paddingLeft: 15,
        paddingRight: 10,

        paddingVertical: 8,
        borderRadius: 999,
    },
    text: {
        fontWeight: 600,
        fontSize: 15,
        color: '#FFF',
    },
    closeButton: {
        backgroundColor: '#FFF',
        borderRadius: 999,
        padding: 4,
    },
});

export default Toast;

// 키보드 훅은 context - provider 로 확장 * 1
// 전체 View 에서 동일한 값을 가져오지 못하는 문제 해결을 위함. *
