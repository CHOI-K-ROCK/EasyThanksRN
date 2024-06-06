import React from 'react';

import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import SafeAreaView from '../../../components/common/SafeAreaView';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import ScreenLayout from '../../../components/common/ScreenLayout';
import CustomText from '../../../components/common/CustomText';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    OpenSourceDetailScreenRouteProps,
    OpenSourceScreenNavigationProps,
} from '../../../@types/navigations/settingStack';
import HorizontalDivider from '../../../components/common/HorizontalDivider';
import { openUrl } from '../../../utils/linking';

const OpenSourceDetailScreen = () => {
    const { goBack } = useNavigation<OpenSourceScreenNavigationProps>();
    const {
        params: {
            data: {
                name,
                version,
                publisher,
                description,
                repository,
                url,
                email,
                licenses,
                licenseText,
            },
        },
    } = useRoute<OpenSourceDetailScreenRouteProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar goBack={goBack} screenTitle={'오픈소스 세부정보'} />
            <ScreenLayout>
                <ScrollView style={styles.container}>
                    <View>
                        <CustomText style={styles.name}>{name}</CustomText>
                        <CustomText style={styles.version}>{'v' + version}</CustomText>
                        {publisher && <CustomText style={styles.publisher}>{publisher}</CustomText>}

                        {description && (
                            <CustomText style={styles.description}>{description}</CustomText>
                        )}
                    </View>
                    <HorizontalDivider style={styles.divider} />

                    <View style={styles.linksContainer}>
                        {repository && (
                            <TouchableOpacity onPress={() => openUrl(repository)}>
                                <CustomText style={styles.link}>{repository}</CustomText>
                            </TouchableOpacity>
                        )}
                        {url && (
                            <TouchableOpacity onPress={() => openUrl(url)}>
                                <CustomText style={styles.link}>{url}</CustomText>
                            </TouchableOpacity>
                        )}
                        {email && (
                            <TouchableOpacity onPress={() => openUrl('mailto:' + email)}>
                                <CustomText style={styles.link}>{email}</CustomText>
                            </TouchableOpacity>
                        )}
                    </View>
                    <HorizontalDivider style={styles.divider} />

                    <View>
                        {licenses && <CustomText style={styles.licenses}>{licenses}</CustomText>}
                        {licenseText && <CustomText>{licenseText}</CustomText>}
                    </View>
                </ScrollView>
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {},
    name: {
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 5,
    },
    version: {
        fontSize: 15,
        opacity: 0.7,
    },
    publisher: {
        fontSize: 15,
        fontWeight: 500,
        marginTop: 3,
    },
    description: {
        marginTop: 15,
    },
    linksContainer: {
        gap: 5,
    },
    licenses: {
        fontSize: 15,
        fontWeight: 500,
        marginBottom: 10,
    },
    link: {
        color: '#828282',
        textDecorationLine: 'underline',
    },
    divider: {
        marginVertical: 20,
    },
});

export default OpenSourceDetailScreen;
