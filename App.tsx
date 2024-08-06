import React, { useCallback, useEffect } from 'react';

import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil';
import { isSignedAtom } from 'states/system';
import { userDataAtom } from 'states/user';

import { Appearance, ColorSchemeName, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from 'navigations/RootStack';
import AuthStack from 'navigations/AuthStack';

import ToastProvider from 'components/provider/ToastProvider';
import OverlayProvider from 'components/provider/OverlayProvider';
import LoadingProvider from 'components/provider/LoadingProvider';

import { AppThemeType, customTheme } from 'hooks/useCustomTheme';
import { getAppTheme, getSupabaseAuthToken, saveAppTheme } from 'utils/storage';
import { KeyboardContextProvider } from 'contexts/KeyboardContext';
import { PermissionProvider } from 'contexts/PermissionContext';
import SplashScreen from 'react-native-splash-screen';
import { supabase } from 'services/supabase';
import { getUserById } from 'services/users';
import { Session } from '@supabase/supabase-js';
import { checkSession } from 'logics/auth';

function App(): React.JSX.Element {
    const [isSigned, setSigned] = useRecoilState(isSignedAtom);
    const setUserData = useSetRecoilState(userDataAtom);

    const isDark = useColorScheme() === 'dark';

    const theme = isDark ? customTheme.dark : customTheme.light;

    const initApp = useCallback(async () => {
        try {
            console.log('init app');

            //  앱 테마 체크
            const appTheme = ((await getAppTheme()) || 'device') as AppThemeType;
            const appThemeScheme = (appTheme === 'device' ? null : appTheme) as ColorSchemeName;

            await saveAppTheme(appTheme);
            Appearance.setColorScheme(appThemeScheme);

            // 로그인 세션 체크
            const sessionRes = await checkSession();

            if (!sessionRes.data || !sessionRes.data.user) {
                throw Error('session data is null');
            }

            const userData = await getUserById(sessionRes.data.user.id);

            if (!userData) {
                throw Error('userdata is null');
            }
            setUserData(userData);

            if (userData) {
                setSigned(true);
            } else {
                setSigned(false);
            }
        } catch (e) {
            console.log('app init error :', e);
        } finally {
            SplashScreen.hide();
        }
    }, [setSigned, setUserData]);

    useEffect(() => {
        initApp();
    }, [initApp]);

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
