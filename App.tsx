import React, { useCallback, useEffect } from 'react';

import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil';
import { isSignedAtom } from 'recoil/system';

import { Appearance, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from 'navigation/RootStack';
import AuthStack from 'navigation/AuthStack';

import ToastProvider from 'components/provider/ToastProvider';
import ModalProvider from 'components/provider/ModalProvider';
import LoadingProvider from 'components/provider/LoadingProvider';

import { AppThemeType, customTheme } from 'hooks/useCustomTheme';
import { checkStroageValue, getAppTheme } from 'utils/storage';
import { KeyboardContextProvider } from 'contexts/KeyboardContext';

function App(): React.JSX.Element {
    const [isSigned, setSigned] = useRecoilState(isSignedAtom);
    const isDark = useColorScheme() === 'dark';

    const theme = isDark ? customTheme.dark : customTheme.light;

    const initApp = useCallback(() => {
        // 이후에 훅으로 분리
        async () => {
            try {
                console.log('init app');

                //  앱 테마 체크
                const appTheme = (await getAppTheme()) as AppThemeType | null;
                const appThemeScheme = appTheme === 'device' ? null : appTheme;
                Appearance.setColorScheme(appThemeScheme);
            } catch (e) {
                console.log('app init error :', e);
            }
        };
    }, []);

    useEffect(() => {
        initApp();
    }, [initApp]);

    checkStroageValue('asUserId');

    return (
        <SafeAreaProvider>
            <KeyboardContextProvider>
                <NavigationContainer theme={theme}>
                    <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
                    {isSigned ? <RootStack /> : <AuthStack />}

                    {/* Providers */}
                    <ModalProvider />
                    <ToastProvider />
                    <LoadingProvider />
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
