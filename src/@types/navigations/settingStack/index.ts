import { NavigationProp, RouteProp } from '@react-navigation/native';

// setting
export type SettingStackParamList = {
    SettingScreen: undefined;
    UserProfileEditScreen: undefined;
    UserOptOutScreen: undefined;
    NotificationScreen: undefined;
    NotificationSettingScreen: undefined;
    OpenSourceScreen: undefined;
};

export type SettingScreenNavigationProps = NavigationProp<SettingStackParamList, 'SettingScreen'>;
export type SettingScreenRouteProps = RouteProp<SettingStackParamList, 'SettingScreen'>;

// user
export type UserProfileEditScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'UserProfileEditScreen'
>;
export type UserProfileEditScreenRouteProps = RouteProp<
    SettingStackParamList,
    'UserProfileEditScreen'
>;

export type UserOptOutScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'UserOptOutScreen'
>;
export type UserOptOutScreenRouteProps = RouteProp<SettingStackParamList, 'UserOptOutScreen'>;

// notification (푸시알림 설정)
export type NotificationScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'NotificationScreen'
>;
export type NotificationScreenRouteProps = RouteProp<SettingStackParamList, 'NotificationScreen'>;

export type NotificationSettingScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'NotificationSettingScreen'
>;
export type NotificationSettingScreenRouteProps = RouteProp<
    SettingStackParamList,
    'NotificationSettingScreen'
>;

// open source
export type OpenSourceScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'OpenSourceScreen'
>;
export type OpenSourceScreenRouteProps = RouteProp<SettingStackParamList, 'OpenSourceScreen'>;
