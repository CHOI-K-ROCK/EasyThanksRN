import React, { useCallback, useState } from 'react';

import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

type Props = PressableProps & { duration?: number; scale?: number };

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PushAnimatedPressable = (props: Props) => {
    const {
        children,
        duration = 150,
        scale = 0.95,
        style,
        onPressIn,
        onPressOut,
        ...restProps
    } = props;

    const [isPressed, setIsPressed] = useState<boolean>(false);

    const handlePressIn = useCallback(
        (e: GestureResponderEvent) => {
            setIsPressed(true);
            onPressIn && onPressIn(e);
        },
        [onPressIn]
    );
    const handlePressOut = useCallback(
        (e: GestureResponderEvent) => {
            setIsPressed(false);
            onPressOut && onPressOut(e);
        },
        [onPressOut]
    );

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    scale: isPressed
                        ? withTiming(scale, { duration })
                        : withTiming(1, { duration }),
                },
            ],
        };
    }, [isPressed, scale, duration]);

    return (
        <AnimatedPressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[style, animatedStyle]}
            {...restProps}
        >
            {children}
        </AnimatedPressable>
    );
};
export default PushAnimatedPressable;
