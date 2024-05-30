import React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { ComposeThanksScreenRouteProps } from '../@types/navigations/rootStack';

const ComposeThanksScreen = () => {
    const route = useRoute<ComposeThanksScreenRouteProps>();

    return (
        <View>
            <Text>ComposeThanksScreen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default ComposeThanksScreen;
