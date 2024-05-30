import React from 'react';

import { StyleSheet, Text, ViewStyle } from 'react-native';
import PushAnimatedPressable from '../common/PushAnimatedPressable';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';

type Props = {
    containerStyle?: ViewStyle;
};

const MainTabComposeButton = (props: Props) => {
    const navigation = useNavigation<RootStackNavigationProps>();

    const { containerStyle } = props;

    const openComposeThanks = () => {
        navigation.navigate('ComposeThanksStack');
    };

    return (
        <PushAnimatedPressable
            style={[
                {
                    backgroundColor: '#fcdb93',
                },
                styles.container,
                containerStyle,
            ]}
            onPress={openComposeThanks}
        >
            <Text>작성하기</Text>
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

export default MainTabComposeButton;
