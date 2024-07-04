import React, { useCallback, useEffect, useState } from 'react';

import { StyleSheet } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import SettingListItem from 'components/setting/SettingListItem';
import ScreenLayout from 'components/common/ScreenLayout';
import CheckBox from 'components/common/CheckBox';

import { AppThemeSettingScreenNavigationProps } from 'types/navigations/settingStack';

import { useNavigation } from '@react-navigation/native';
import { AppThemeType } from 'hooks/useCustomTheme';
import useAppTheme from 'hooks/useAppTheme';

const AppThemeSettingScreen = () => {
    const { goBack } = useNavigation<AppThemeSettingScreenNavigationProps>();
    const [appTheme, setAppTheme] = useState<AppThemeType>('device');

    const { setCurrentAppTheme, getCurrentAppTheme } = useAppTheme();

    useEffect(() => {
        const checkCurrentAppTheme = async () => {
            const currentAppTheme = await getCurrentAppTheme();

            setAppTheme(currentAppTheme as AppThemeType);
        };
        checkCurrentAppTheme();
    }, [getCurrentAppTheme]);

    const handleChangeAppTheme = useCallback(
        (type: AppThemeType) => {
            setCurrentAppTheme(type);
            setAppTheme(type);
        },
        [setCurrentAppTheme]
    );

    const deviceOnPress = useCallback(() => handleChangeAppTheme('device'), [handleChangeAppTheme]);
    const lightOnPress = useCallback(() => handleChangeAppTheme('light'), [handleChangeAppTheme]);
    const darkOnPress = useCallback(() => handleChangeAppTheme('dark'), [handleChangeAppTheme]);

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'앱 테마 설정'} goBack={goBack} />
            <ScreenLayout>
                <SettingListItem
                    title={'기기 설정'}
                    subTitle={'앱의 테마가 기기에 설정된 테마를 따릅니다.'}
                    rightComponent={
                        <CheckBox checked={appTheme === 'device'} style={styles.checkBox} />
                    }
                    onPress={deviceOnPress}
                />
                <SettingListItem
                    title={'라이트 모드'}
                    subTitle={'앱의 테마를 라이트 모드로 고정합니다.'}
                    rightComponent={
                        <CheckBox checked={appTheme === 'light'} style={styles.checkBox} />
                    }
                    onPress={lightOnPress}
                />
                <SettingListItem
                    title={'다크 모드'}
                    subTitle={'앱의 테마를 다크모드로 고정합니다.'}
                    rightComponent={
                        <CheckBox checked={appTheme === 'dark'} style={styles.checkBox} />
                    }
                    onPress={darkOnPress}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    checkBox: {
        marginRight: 5,
    },
});

export default AppThemeSettingScreen;
