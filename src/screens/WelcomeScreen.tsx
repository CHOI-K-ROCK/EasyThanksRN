import React from 'react';

import { Text, View } from 'react-native';
import SafeAreaView from '../components/common/SafeAreaView';

import { RootStackNavigationProps } from '../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../hooks/useCustomTheme';

const WelcomeScreen = () => {
    const navigation = useNavigation<RootStackNavigationProps>();
    const { colors } = useCustomTheme();

    const onPress = () => {
        navigation.navigate('ComposeThanksStack');
    };
    return (
        <SafeAreaView>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 500,
                        color: colors.text,
                    }}
                    onPress={onPress}
                >
                    welcome screen
                </Text>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
