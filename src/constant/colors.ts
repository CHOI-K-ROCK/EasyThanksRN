const commonTheme = {
    mainColor: '#A1887F',
};

const darkTheme = {
    ...commonTheme,
    text: '#FFFFFF',
    background: '#2E2E2E',
    tabBarBackground: '#383838',
    tabBarIconActive: '#A1887F',
    tabBarIconInactive: '#B0B0B0',
};

const lightTheme = {
    ...commonTheme,
    text: '#000000',
    background: '#FFFFFF',
    tabBarBackground: '#F8F8F8',
    tabBarIconActive: '#A1887F',
    tabBarIconInactive: '#C4C4C4',
};

export { darkTheme, lightTheme };
