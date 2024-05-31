import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from '../constant/colors';
import { useMemo } from 'react';

type appThemeType = 'light' | 'dark' | 'device';

const useCustomTheme = () => {
    // 디바이스 설정값
    const colorScheme = useColorScheme();
    // 앱 설정값 (임시) -> 추후 앱 설정값으로.
    const appTheme = 'device' as appThemeType;

    const isDark = useMemo(() => {
        if (appTheme === 'device') {
            return colorScheme === 'dark' ? true : false;
        }

        return appTheme === 'dark' ? true : false;
    }, [colorScheme, appTheme]);

    const colors = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

    return { colors, isDark };
};

export default useCustomTheme;
