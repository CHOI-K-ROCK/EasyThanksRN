import { useColorScheme } from 'react-native';
import { DARK_THEME, LIGHT_THEME } from '../constant/colors';
import { useMemo } from 'react';

type appThemeType = 'light' | 'dark' | 'device';
/**
 * @returns colors - 현재 테마의 색상 정보
 * @returns isDark - 현재 다크 테마 여부
 */
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

    const colors = useMemo(() => (isDark ? DARK_THEME : LIGHT_THEME), [isDark]);

    return { colors, isDark };
};

export default useCustomTheme;
