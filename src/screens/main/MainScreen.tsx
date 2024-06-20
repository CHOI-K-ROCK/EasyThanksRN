import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../../components/common/CustomText';

import useToast from '../../hooks/useToast';
import RotationThanksWordsView from '../../components/main/RotationThanksWordsView';

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { openToast } = useToast();
    const { navigate } = useNavigation<RootStackNavigationProps>();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <RotationThanksWordsView />
            {/* <CustomText
                onPress={() =>
                    openToast({
                        type: 'common',
                        text: '🍞',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal common
            </CustomText>
            <CustomText
                onPress={() =>
                    openToast({
                        type: 'caution',
                        text: '완성입니다!',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal caution
            </CustomText>
            <CustomText
                onPress={() =>
                    openToast({
                        type: 'complete',
                        text: '🍞',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal complete
            </CustomText>
            <CustomText
                onPress={() =>
                    openToast({
                        type: 'error',
                        text: '🍞',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal error
            </CustomText> */}
        </SafeAreaView>
    );
};

export default MainScreen;
