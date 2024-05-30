import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

type Props = {
    containerStyle?: ViewStyle;
};

const MainTabComposeThanksButton = (props: Props) => {
    const navigation = useNavigation<RootStackNavigationProps>();

    const { containerStyle } = props;

    const openComposeThanks = () => {
        navigation.navigate('ComposeThanksStack');
    };

    return (
        <TouchableOpacity style={containerStyle} onPress={openComposeThanks}>
            <Text>Add</Text>
        </TouchableOpacity>
    );
};

export default MainTabComposeThanksButton;
