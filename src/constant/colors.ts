const commonTheme = {
    mainColor: '#D2B48C',
};

const darkTheme = {
    ...commonTheme,
    text: '#FFFFFF',
    background: '#2E2E2E',
    tabBarBackground: '#383838',
    tabBarIconActive: '#D2B48C',
    tabBarIconInactive: '#B0B0B0',
};

const lightTheme = {
    ...commonTheme,
    text: '#000000',
    background: '#FFFFFF',
    tabBarBackground: '#F8F8F8',
    tabBarIconActive: '#D2B48C',
    tabBarIconInactive: '#C4C4C4',
};

export { darkTheme, lightTheme };
