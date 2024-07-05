import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ColorValue, StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import Animated, { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import VectorIcon from 'components/common/VectorIcon';

import { ToastType } from 'types/models/toast';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useToast from 'hooks/useToast';
import useCustomTheme from 'hooks/useCustomTheme';
import useDelay from 'hooks/useDelay';
import useKeyboard from 'hooks/useKeyboard';

import { commonStyles } from 'styles';

const Toast = (props: ToastType & { idx: number }) => {
    const { closeToast } = useToast();
    const { bottom } = useSafeAreaInsets();
    const { colors } = useCustomTheme();
    const { keyboardHeight } = useKeyboard();

    const { type = 'common', id, text, component, duration = 3500, idx } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [messageSize, setMessageSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

    const newDelay = useDelay();
    // variables

    const ANIMATION_DURATION = 300;
    const EASING_BEZIER = Easing.bezier(0.25, 0.1, 0.25, 1);
    const APPEAR_HEIGHT = keyboardHeight + bottom;

    useEffect(() => {
        const handleToast = async () => {
            setVisible(true);

            await newDelay(ANIMATION_DURATION);
            await newDelay(duration);

            setVisible(false);
            await newDelay(ANIMATION_DURATION);
            closeToast(id);
        };

        handleToast();
    }, [closeToast, duration, id, newDelay]);

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
        setVisible(false);
        await newDelay(ANIMATION_DURATION);

        closeToast(id);
    }, [closeToast, id, newDelay]);

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
                <ToastIcon type={type} />
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

const ToastIcon = ({ type }: { type: ToastType['type'] }) => {
    const { colors } = useCustomTheme();

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
