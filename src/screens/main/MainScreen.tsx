import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../../components/common/CustomText';

import { View } from 'react-native';
import useDimensions from '../../hooks/useDimensions';
import useAuth from '../../hooks/useAuth';
import useAppTheme from '../../hooks/useAppTheme';
import useLoading from '../../hooks/useLoading';
import useDelay from '../../hooks/useDelay';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    const { setLoading } = useLoading();
    const { logout } = useAuth();
    const delay = useDelay();

    const { navigate } = useNavigation<RootStackNavigationProps>();
    const { setCurrentAppTheme } = useAppTheme();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    const handleLogout = async () => {
        setLoading(true);
        await delay(500);
        await logout();
        setLoading(false);
    };

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <View style={{ gap: 20 }}>
                <CustomText style={{ fontSize: 25 }} onPress={handleLogout}>
                    handleLogout
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setCurrentAppTheme('device')}>
                    dev
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setCurrentAppTheme('light')}>
                    lig
                </CustomText>
                <CustomText style={{ fontSize: 25 }} onPress={() => setCurrentAppTheme('dark')}>
                    dar
                </CustomText>
            </View>
            {/* <ScrollView horizontal snapToEnd snapToInterval={wp(100)} decelerationRate={'fast'}>
                <KakaoTestScreen />
                <NaverTestScreen />
                <GoogleTestScreen />
            </ScrollView> */}
            {/* <ScreenLayout> */}
            {/* <RotationThanksWordsView /> */}

            {/* </ScreenLayout> */}
        </SafeAreaView>
    );
};

export default MainScreen;
