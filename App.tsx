import React from 'react';

import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import MainScreen from './src/screens/WelcomeScreen';
import MainStack from './src/navigation/MainStack';

function App(): React.JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? '#000' : '#FFF',
    };

    return (
        <JotaiProvider>
            <NavigationContainer>
                {/* <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            /> */}
                <MainStack />
            </NavigationContainer>
        </JotaiProvider>
    );
}

export default App;
