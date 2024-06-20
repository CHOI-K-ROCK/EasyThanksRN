import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, Touchable, View } from 'react-native';
import CustomText from '../common/CustomText';
import { getRandomArrayValue } from '../../utils/data';
import { THANKS_MAXIMS } from '../../constant/string';
import VectorIcon from '../common/VectorIcon';
import Animated, {
    SlideInRight,
    SlideOutLeft,
    SlideOutRight,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { transform } from '@babel/core';

const RotationThanksWordsView = () => {
    const [maximData, setMaximData] = useState<{ maxim: string; author: string }>(
        getRandomArrayValue(THANKS_MAXIMS)
    );

    const { maxim, author } = maximData;

    //animation
    const delayedEntering = useCallback((delay: number) => {
        return () => {
            'worklet';

            const animations = {
                opacity: withDelay(delay, withTiming(1, { duration: 200 })),
                transform: [
                    {
                        translateX: withDelay(delay, withTiming(0, { duration: 200 })),
                    },
                ],
            };
            const initialValues = {
                opacity: 0,
                transform: [
                    {
                        translateX: 20,
                    },
                ],
            };

            return { animations, initialValues };
        };
    }, []);

    const delayedExiting = (delay: number) => {
        return () => {
            'worklet';

            const animations = {
                opacity: withDelay(delay, withTiming(0, { duration: 300 })),
                transform: [
                    {
                        translateX: withDelay(delay, withTiming(-20, { duration: 300 })),
                    },
                ],
            };
            const initialValues = {
                opacity: 1,
                transform: [
                    {
                        translateX: 0,
                    },
                ],
            };

            return { animations, initialValues };
        };
    };
    // handler

    const getOtherMaxim = () => {
        setMaximData(getRandomArrayValue(THANKS_MAXIMS));
    };

    return (
        <View>
            <Animated.View key={maxim} entering={delayedEntering(0)} exiting={delayedExiting(0)}>
                <CustomText style={[{}, styles.maxim]}>{maxim}</CustomText>
            </Animated.View>
            <Animated.View key={author} entering={delayedEntering(200)} exiting={delayedExiting(0)}>
                <CustomText style={[{}, styles.author]}>{author}</CustomText>
            </Animated.View>
            <VectorIcon name="refresh" onPress={getOtherMaxim} />
        </View>
    );
};

const styles = StyleSheet.create({
    maxim: {
        fontSize: 17,
        fontWeight: 500,
    },
    author: {
        fontSize: 15,
        opacity: 0.5,
    },
});

export default RotationThanksWordsView;
