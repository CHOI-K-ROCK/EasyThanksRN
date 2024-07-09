import React, { useCallback, useState } from 'react';

import {
    ColorValue,
    FlatList,
    Image,
    LayoutChangeEvent,
    StyleSheet,
    View,
    ViewToken,
} from 'react-native';
import Animated, {
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

type Props = {
    images: string[];

    width?: number;
    height?: number;
    aspectRatio?: number;

    backgroundColor?: ColorValue;
};

const ImageCarousel = (props: Props) => {
    const { images, width, height, aspectRatio = 4 / 3, backgroundColor = '#00000050' } = props;

    const [layoutWidth, setLayoutWidth] = useState<number>(0);
    const [currnetImageIndex, setCurrentImageIndex] = useState<number>(0);

    const IS_MULTIPLE_IMAGE = images.length > 1;

    const _onLayout = (e: LayoutChangeEvent) => {
        setLayoutWidth(e.nativeEvent.layout.width);
    };

    const _onViewableItemsChanged = ({ viewableItems }: { viewableItems: ViewToken<string>[] }) => {
        const { index } = viewableItems[0];
        // 한 화면에 여러개가 보이는 경우 viewableItems 배열에 보이는 모든 요소를 담는다.
        // 하지만, 현재는 요소의 너비를 layoutWidth 로 처리하였고, 한번에 보이는 요소가 하나 뿐 이므로
        // 배열을 가장 첫번째 요소만을 가져와 사용한다.
        setCurrentImageIndex(index as number);
    };

    // ui
    const _renderItem = useCallback(
        ({ item }: { item: string }) => {
            return (
                <Animated.View
                    style={[
                        {
                            width: layoutWidth,

                            aspectRatio,
                        },
                    ]}
                >
                    <Image resizeMode="contain" source={{ uri: item }} style={styles.image} />
                </Animated.View>
            );
        },
        [aspectRatio, layoutWidth]
    );

    const _keyExtractor = useCallback((item: string, index: number) => {
        return index.toString();
        // 테스트 단계에선 index 를 쓰나, 실사용에서는 서로 다른 url이 key로 사용돼야함
    }, []);

    return (
        <View
            onLayout={_onLayout}
            style={{
                width,
                height,
                backgroundColor,
            }}
        >
            <Animated.FlatList
                data={images}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={IS_MULTIPLE_IMAGE}
                snapToInterval={layoutWidth}
                decelerationRate={'fast'}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                onViewableItemsChanged={_onViewableItemsChanged}
            />
            <View
                style={[
                    { width: layoutWidth, bottom: layoutWidth * 0.02 },
                    styles.indicatorContainer,
                ]}
            >
                {IS_MULTIPLE_IMAGE && (
                    <CarouselIndicator length={images.length} currentIndex={currnetImageIndex} />
                )}
            </View>
        </View>
    );
};

export default ImageCarousel;

const styles = StyleSheet.create({
    image: {
        flex: 1,
    },
    indicatorContainer: {
        position: 'absolute',
    },
});

// deps component

const CarouselIndicator = (props: {
    length: number;
    currentIndex: number;

    gap?: number;

    activeColor?: ColorValue;
    deactiveColor?: ColorValue;
}) => {
    const {
        length,
        currentIndex,
        gap = 7,
        activeColor = '#ffffff',
        deactiveColor = '#ffffff50',
    } = props;

    return (
        <View style={[{ gap }, carouselIndicatorStyles.indicatorContainer]}>
            {Array.from({ length }).map((_, idx) => {
                const IS_ACTIVE_INDICATOR = currentIndex === idx;

                return (
                    <View
                        key={idx.toString()}
                        style={[
                            {
                                backgroundColor: IS_ACTIVE_INDICATOR ? activeColor : deactiveColor,
                            },
                            carouselIndicatorStyles.indicator,
                        ]}
                    />
                );
            })}
        </View>
    );
};

const carouselIndicatorStyles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    indicator: {
        width: 8,
        aspectRatio: 1,
        borderRadius: 999,
    },
});
