import React from 'react';

import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as JotaiProvider } from 'jotai';

import RootStack from './src/navigation/RootStack';

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
                <RootStack />
            </NavigationContainer>
        </JotaiProvider>
    );
}

export default App;
