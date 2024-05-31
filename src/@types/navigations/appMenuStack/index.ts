import { NavigationProp, RouteProp } from '@react-navigation/native';

// AppMenu
export type AppMenuStackParamList = {
    AppMenuScreen: undefined;
    UserProfileScreen: undefined;
    UserOptOutScreen: undefined;
    NotificationScreen: undefined;
    NotificationSettingScreen: undefined;
};

export type AppMenuScreenNavigationProps = NavigationProp<
    AppMenuStackParamList,
    'AppMenuScreen'
>;
export type AppMenuScreenRouteProps = RouteProp<
    AppMenuStackParamList,
    'AppMenuScreen'
>;

// user
export type UserProfileScreenNavigationProps = NavigationProp<
    AppMenuStackParamList,
    'UserProfileScreen'
>;
export type UserProfileScreenRouteProps = RouteProp<
    AppMenuStackParamList,
    'UserProfileScreen'
>;

export type UserOptOutScreenNavigationProps = NavigationProp<
    AppMenuStackParamList,
    'UserOptOutScreen'
>;
export type UserOptOutScreenRouteProps = RouteProp<
    AppMenuStackParamList,
    'UserOptOutScreen'
>;

// notification (푸시알림 설정)
export type NotificationScreenNavigationProps = NavigationProp<
    AppMenuStackParamList,
    'NotificationScreen'
>;
export type NotificationScreenRouteProps = RouteProp<
    AppMenuStackParamList,
    'NotificationScreen'
>;

export type NotificationSettingScreenNavigationProps = NavigationProp<
    AppMenuStackParamList,
    'NotificationSettingScreen'
>;
export type NotificationSettingScreenRouteProps = RouteProp<
    AppMenuStackParamList,
    'NotificationSettingScreen'
>;
