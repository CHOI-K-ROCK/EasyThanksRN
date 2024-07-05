import React, { ReactElement, ReactNode, useState } from 'react';
import { LayoutChangeEvent, Modal, Pressable, StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import useDimensions from 'hooks/useDimensions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
    visible: boolean;
    children: ReactElement;
    onPressBackdrop: () => void;
};

const BottomSheet = (props: Props) => {
    const { hp } = useDimensions();
    const { bottom } = useSafeAreaInsets();
    const { children, visible, onPressBackdrop } = props;

    const [sheetHeight, setSheetHeight] = useState<number>(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withTiming(visible ? -sheetHeight : 0) }],
        };
    }, [visible]);

    const _onLayout = (e: LayoutChangeEvent) => {
        setSheetHeight(e.nativeEvent.layout.height);
    };

    return (
        visible && (
            <Modal transparent animationType="none">
                <View style={[StyleSheet.absoluteFill]}>
                    <Pressable
                        onPress={onPressBackdrop}
                        style={[
                            { backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 100 },
                            StyleSheet.absoluteFill,
                        ]}
                    />
                    <Animated.View
                        style={[{ top: hp(100), zIndex: 100 }, animatedStyle]}
                        onLayout={_onLayout}
                    >
                        {children}
                    </Animated.View>
                </View>
            </Modal>
        )
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default BottomSheet;
