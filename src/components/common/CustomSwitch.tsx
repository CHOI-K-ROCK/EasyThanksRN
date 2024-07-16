import React from 'react';
import { StyleSheet, View } from 'react-native';
import PushAnimatedPressable from './PushAnimatedPressable';

type Props = {
    active: boolean;
    onChange?: (active: boolean) => void;
};

const ACTIVE_BACKGROUND_COLOR = '#000';
const ACTIVE_CIRCLE_COLOR = '#fff';
const DEACTIVE_BACKGROUND_COLOR = '#888';
const DEACTIVE_CIRCLE_COLOR = '#555';

const INNER_GAP = 2;
const SWITCH_WIDTH = 58;
const SWITCH_HEIGHT = 32;

const CustomSwitch = (props: Props) => {
    const { active = true, onChange } = props;

    const backgroundColor = active ? ACTIVE_BACKGROUND_COLOR : DEACTIVE_BACKGROUND_COLOR;
    const circleColor = active ? ACTIVE_CIRCLE_COLOR : DEACTIVE_CIRCLE_COLOR;

    const CIRCLE_WIDTH = SWITCH_HEIGHT - INNER_GAP * 2;

    const handleOnChange = () => {
        onChange && onChange(active);
    };

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                padding: INNER_GAP,
                width: SWITCH_WIDTH,
                height: SWITCH_HEIGHT,
                borderRadius: 999,
            }}
        >
            <PushAnimatedPressable
                onPress={handleOnChange}
                scale={1}
                style={[
                    {
                        position: 'absolute',
                        backgroundColor: circleColor,
                        height: CIRCLE_WIDTH,
                        width: CIRCLE_WIDTH,
                        top: INNER_GAP,
                        borderRadius: 999,
                    },
                    { ...(active ? styles.circleActive : styles.circleDeactive) },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    circle: {},
    circleActive: { right: 2 },
    circleDeactive: { left: 2 },
});

export default React.memo(CustomSwitch);
