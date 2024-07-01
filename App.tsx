import React, { useEffect } from 'react';

import { RecoilRoot, useRecoilValue } from 'recoil';
import { isSignedAtom } from './src/recoil/system';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from './src/navigation/RootStack';
import AuthStack from './src/navigation/AuthStack';

import ToastProvider from './src/components/provider/ToastProvider';
import ModalProvider from './src/components/provider/ModalProvider';
import LoadingProvider from './src/components/provider/LoadingProvider';

import useCustomTheme from './src/hooks/useCustomTheme';
import { get, set } from './src/utils/storage';

function App(): React.JSX.Element {
    const { colors, isDark } = useCustomTheme();
    const isSigned = useRecoilValue(isSignedAtom);

    useEffect(() => {
        const initApp = async () => {
            console.log('run');
            await set('system', JSON.stringify({ isSigned: true }));
            const system = await get('system');
            console.log(system);
        };

        initApp();
    }, []);

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                    backgroundColor={colors.tabBarBackground}
                />
                {isSigned ? <RootStack /> : <AuthStack />}
            </NavigationContainer>

            {/* Providers */}

            <ModalProvider />
            <ToastProvider />
            <LoadingProvider />
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
