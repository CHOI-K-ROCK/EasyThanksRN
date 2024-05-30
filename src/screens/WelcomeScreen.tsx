import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text } from 'react-native';
import { RootStackNavigationProps } from '../@types/navigations/rootStack';
import SafeAreaView from '../components/common/SafeAreaView';

export { useAtom } from 'jotai';

const WelcomeScreen = () => {
    const navigation = useNavigation<RootStackNavigationProps>();

    const onPress = () => {
        navigation.navigate('ComposeThanksStack');
    };
    return (
        <SafeAreaView>
            <Text onPress={onPress}>welcome screen</Text>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
