import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import RootStack from './src/navigation/RootStack';
import useCustomTheme from './src/hooks/useCustomTheme';
import AuthStack from './src/navigation/AuthStack';
import ModalManager from './src/components/modal/ModalManager';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
                <ModalManager />
            </SafeAreaProvider>
        </JotaiProvider>
    );
}

export default App;
