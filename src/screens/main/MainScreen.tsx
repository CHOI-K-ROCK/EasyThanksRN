import React, { useReducer, useState } from 'react';

import { View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';

import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useBottomSheet from 'hooks/useBottomSheet';
import FullWidthButton from 'components/common/FullWidthButton';

const Re = ({ closeModal }: { closeModal: () => void }) => {
    const [newCount, setNewCount] = useState(2);
    const { closeBottomSheet } = useBottomSheet();
    return (
        <View
            style={{
                height: 200,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <CustomText
                onPress={() => setNewCount(prev => prev + 1)}
                style={{ fontSize: 24, fontWeight: 700 }}
            >
                {newCount}
            </CustomText>
            <FullWidthButton
                title="close"
                onPress={closeBottomSheet}
                style={{ backgroundColor: '#DDD' }}
            />
        </View>
    );
};

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const { openBottomSheet, closeBottomSheet } = useBottomSheet();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    const open = () => {
        openBottomSheet(() => <Re closeModal={closeBottomSheet} />);
    };

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <View style={{ gap: 20 }}>
                <CustomText style={{ fontSize: 25, marginTop: 20 }} onPress={open}>
                    toggleBottomSheet
                </CustomText>
            </View>
        </SafeAreaView>
    );
};

export default MainScreen;
