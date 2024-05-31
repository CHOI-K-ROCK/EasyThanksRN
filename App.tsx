import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import RootStack from './src/navigation/RootStack';
import useCustomTheme from './src/hooks/useCustomTheme';
import AuthStack from './src/navigation/AuthStack';

function App(): React.JSX.Element {
    const { isDark } = useCustomTheme();
    const isLoggedIn = true;

    return (
        <JotaiProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                />
                {isLoggedIn ? <RootStack /> : <AuthStack />}
            </NavigationContainer>
        </JotaiProvider>
    );
}

export default App;
