import React from 'react';

import { StyleSheet, ViewStyle } from 'react-native';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';

import useCustomTheme from 'hooks/useCustomTheme';
import VectorIcon from 'components/common/VectorIcon';

type Props = {
    containerStyle?: ViewStyle;
    onPress: () => void;
};

const MainTabBarComposeButton = (props: Props) => {
    const { colors } = useCustomTheme();

    const { containerStyle, onPress } = props;

    return (
        <PushAnimatedPressable
            style={[
                {
                    backgroundColor: colors.mainColor,
                },
                styles.container,
                containerStyle,
            ]}
            onPress={onPress}
        >
            <VectorIcon name={'pencil'} color={'#FFF'} size={30} />
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        aspectRatio: 1,
        borderRadius: 999,
    },
});

export default React.memo(MainTabBarComposeButton);
