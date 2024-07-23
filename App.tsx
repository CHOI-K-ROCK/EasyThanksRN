import React, { useCallback, useEffect } from 'react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { isSignedAtom } from 'states/system';

import { Appearance, ColorSchemeName, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from 'navigations/RootStack';
import AuthStack from 'navigations/AuthStack';

import ToastProvider from 'components/provider/ToastProvider';
import OverlayProvider from 'components/provider/OverlayProvider';
import LoadingProvider from 'components/provider/LoadingProvider';

import { AppThemeType, customTheme } from 'hooks/useCustomTheme';
import { checkStroageValue, getAppTheme, saveAppTheme } from 'utils/storage';
import { KeyboardContextProvider } from 'contexts/KeyboardContext';
import { PermissionProvider } from 'contexts/PermissionContext';

function App(): React.JSX.Element {
    const [isSigned, setSigned] = useRecoilState(isSignedAtom);
    // const isSigned = true;
    const isDark = useColorScheme() === 'dark';

    const theme = isDark ? customTheme.dark : customTheme.light;

    const initApp = async () => {
        try {
            console.log('init app');

            //  앱 테마 체크
            const appTheme = ((await getAppTheme()) || 'device') as AppThemeType;
            const appThemeScheme = (appTheme === 'device' ? null : appTheme) as ColorSchemeName;

            saveAppTheme(appTheme);
            console.log('appThemeScheme', appThemeScheme);
            Appearance.setColorScheme(appThemeScheme);
        } catch (e) {
            console.log('app init error :', e);
        }
    };

    useEffect(() => {
        initApp();
    }, []);

    return (
        <SafeAreaProvider>
            <KeyboardContextProvider>
                <NavigationContainer theme={theme}>
                    <PermissionProvider>
                        <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
                        {isSigned ? <RootStack /> : <AuthStack />}

                        {/* Overlay Providers */}
                        <OverlayProvider />
                        <ToastProvider />
                        <LoadingProvider />
                    </PermissionProvider>
                </NavigationContainer>
            </KeyboardContextProvider>
        </SafeAreaProvider>
    );
}

const AppWithRecoilRoot = () => {
    return (
        <RecoilRoot>
            <App />
        </RecoilRoot>
    );
};

export default AppWithRecoilRoot;
