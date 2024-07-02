import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';

import { useNavigation } from '@react-navigation/native';
import { AppThemeSettingScreenNavigationProps } from '../../@types/navigations/settingStack';

const AppThemeSettingScreen = () => {
    const { goBack } = useNavigation<AppThemeSettingScreenNavigationProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="앱 테마 설정" goBack={goBack} />
            <TempScreen title="noti" />
        </SafeAreaView>
    );
};

export default AppThemeSettingScreen;
