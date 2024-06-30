import React from 'react';

import { RecoilRoot, useRecoilValue } from 'recoil';
import { systemAtom } from './src/state/system';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootStack from './src/navigation/RootStack';
import AuthStack from './src/navigation/AuthStack';

import ToastProvider from './src/components/provider/ToastProvider';
import ModalProvider from './src/components/provider/ModalProvider';
import LoadingProvider from './src/components/provider/LoadingProvider';

import useCustomTheme from './src/hooks/useCustomTheme';

function App(): React.JSX.Element {
    const { colors, isDark } = useCustomTheme();
    const { isSigned } = useRecoilValue(systemAtom);

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
