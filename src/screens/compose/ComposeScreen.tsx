import React from 'react';

import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import SafeAreaView from '../../components/common/SafeAreaView';

import {} from '../../@types/navigations/rootStack';
import TempScreen from '../../components/common/TempScreen';
import { ComposeScreenNavigationProps, ComposeScreenRouteProps } from '../../@types/navigations/composeStack';

const ComposeScreen = () => {
    const { goBack } = useNavigation<ComposeScreenNavigationProps>();

    return (
        <SafeAreaView>
            <Button title="asdasd" onPress={() => goBack()} />
            <TempScreen title={'ComposeScreen'} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default ComposeScreen;
