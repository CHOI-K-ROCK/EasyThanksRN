import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import SafeAreaView from '../../components/common/SafeAreaView';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from '../../@types/navigations/rootStack';
import TempScreen from '../../components/common/TempScreen';

const ComposeScreen = () => {
    const route = useRoute<ComposeScreenRouteProps>();
    const navigation = useNavigation<ComposeScreenNavigationProps>();

    return (
        <SafeAreaView>
            <Button title="asdasd" onPress={() => navigation.goBack()} />
            <TempScreen title={'ComposeScreen'} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default ComposeScreen;
