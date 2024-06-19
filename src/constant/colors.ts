const COMMON_THEME = {
    mainColor: '#D2B48C',
};

const DARK_THEME = {
    ...COMMON_THEME,
    text: '#FFFFFF',
    textReverse: '#000000',
    background: '#2E2E2E',
    tabBarBackground: '#383838',
    tabBarIconActive: '#D2B48C',
    tabBarIconInactive: '#B0B0B0',
    inputBackground: '#252525',
    badgeButtonText: '#',

    toastBackground: 'rgba(0,0,0,0.6)',

    caution: '#ea8c07',
    complete: '#62c70a',
    warning: '#d42c16',
};

const LIGHT_THEME = {
    ...COMMON_THEME,
    text: '#000000',
    textReverse: '#FFFFFF',
    background: '#FFFFFF',
    tabBarBackground: '#F8F8F8',
    tabBarIconActive: '#D2B48C',
    tabBarIconInactive: '#C4C4C4',
    inputBackground: '#EEEEEE',
    badgeButtonText: '#',

    toastBackground: 'rgba(0,0,0,0.4)',

    caution: '#ffa50a',
    complete: '#75ed0b',
    warning: '#ff311e',
};

export { DARK_THEME, LIGHT_THEME };
