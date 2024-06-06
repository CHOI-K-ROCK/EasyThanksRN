import { Linking } from 'react-native';

export const openUrl = async (url: string) => {
    try {
        const isValidUrl = await Linking.canOpenURL(url);

        if (isValidUrl) {
            await Linking.openURL(url);
        }
    } catch (error: any) {
        console.error(error.message);
    }
};
