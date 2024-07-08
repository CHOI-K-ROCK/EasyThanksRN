import React, { useState } from 'react';

import { View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import FullWidthButton from 'components/common/FullWidthButton';
import BottomSheet from 'components/modal/common/BottomSheet';

import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useOverlay from 'hooks/useOverlay';

const Re = ({ closeBottomSheet }: { closeBottomSheet: () => void }) => {
    const [newCount, setNewCount] = useState(2);

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

    const { openOverlay, closeOverlay } = useOverlay(() => (
        <BottomSheet onPressBackdrop={closeOverlay} options={{}}>
            <Re closeBottomSheet={closeOverlay} />
        </BottomSheet>
    ));

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    const open = () => {
        openOverlay();
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
