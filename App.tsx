import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import RootStack from './src/navigation/RootStack';
import useCustomTheme from './src/hooks/useCustomTheme';

function App(): React.JSX.Element {
    const { isDark } = useCustomTheme();

    return (
        <JotaiProvider>
            <NavigationContainer>
                <StatusBar
                    barStyle={isDark ? 'light-content' : 'dark-content'}
                />
                <RootStack />
            </NavigationContainer>
        </JotaiProvider>
    );
}

export default App;
