import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput } from 'react-native';
import Title from '../components/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSomething from '../hooks/useSomething';
import { useAtom } from 'jotai';
import { testAtom } from '../state/sample';

const WelcomeScreen = () => {
    const [something] = useSomething();
    const [testAtomValue, setTestAtom] = useAtom(testAtom);
    const [inputValue, setInputValue] = useState<string>('');

    console.log('hook value =', something);

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.container}>
                <Title>WelcomeScreen</Title>
                <Text>{testAtomValue}</Text>
                <TextInput
                    style={{
                        backgroundColor: '#DDD',
                        width: '70%',
                        height: 40,
                    }}
                    onChangeText={e => setTestAtom(e)}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default WelcomeScreen;
