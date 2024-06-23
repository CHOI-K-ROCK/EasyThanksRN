import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import RootStack from './src/navigation/RootStack';
import useCustomTheme from './src/hooks/useCustomTheme';
import AuthStack from './src/navigation/AuthStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ToastProvider from './src/components/provider/ToastProvider';
import ModalProvider from './src/components/provider/ModalProvider';
import LoadingProvider from './src/components/provider/LoadingProvider';

function App(): React.JSX.Element {
    const { colors, isDark } = useCustomTheme();
    const isLoggedIn = true;

    return (
        <JotaiProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <StatusBar
                        barStyle={isDark ? 'light-content' : 'dark-content'}
                        backgroundColor={colors.tabBarBackground}
                    />
                    {isLoggedIn ? <RootStack /> : <AuthStack />}
                </NavigationContainer>
                {/* Providers */}
                <ModalProvider />
                <ToastProvider />
                <LoadingProvider />
            </SafeAreaProvider>
        </JotaiProvider>
    );
}

export default App;
