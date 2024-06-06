import React from 'react';
import { StyleSheet } from 'react-native';
import SafeAreaView from '../../../components/common/SafeAreaView';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import { useNavigation } from '@react-navigation/native';
import { OpenSourceScreenNavigationProps } from '../../../@types/navigations/settingStack';

const OpenSourceScreen = () => {
    const { goBack } = useNavigation<OpenSourceScreenNavigationProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'오픈소스'} goBack={goBack} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default OpenSourceScreen;
