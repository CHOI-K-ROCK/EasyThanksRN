import { Appearance } from 'react-native';
import { AppThemeType } from './useCustomTheme';
import { getAppTheme, saveAppTheme } from '../utils/storage';

const useAppTheme = () => {
    const setAppTheme = (theme: AppThemeType) => {
        saveAppTheme(theme); // 로컬 저장

        if (theme === 'light' || theme === 'dark') {
            Appearance.setColorScheme(theme);
            return;
        }

        Appearance.setColorScheme(null);
    };

    const getCurrentAppTheme = async () => {
        const appTheme = getAppTheme() || 'device';
        return appTheme;
    };

    return {
        setAppTheme,
        getCurrentAppTheme,
    };
};

export default useAppTheme;
