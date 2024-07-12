import { NavigationProp, RouteProp } from '@react-navigation/native';
import { OpenSourceDataType } from '../../openSource';
import { UserEditDataType } from '../../models/user';

// setting
export type SettingStackParamList = {
    SettingScreen: undefined;
    UserProfileEditScreen: { userData: UserEditDataType };
    ReminderScreen: undefined;
    NotificationSettingScreen: undefined;
    AppThemeSettingScreen: undefined;
    OpenSourceScreen: undefined;
    OpenSourceDetailScreen: { data: OpenSourceDataType };
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

// notification (푸시알림 설정)
export type ReminderScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'ReminderScreen'
>;
export type ReminderScreenRouteProps = RouteProp<SettingStackParamList, 'ReminderScreen'>;

export type NotificationSettingScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'NotificationSettingScreen'
>;
export type NotificationSettingScreenRouteProps = RouteProp<
    SettingStackParamList,
    'NotificationSettingScreen'
>;

// app theme

export type AppThemeSettingScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'AppThemeSettingScreen'
>;
export type AppThemeSettingScreenRouteProps = RouteProp<
    SettingStackParamList,
    'AppThemeSettingScreen'
>;

// open source
export type OpenSourceScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'OpenSourceScreen'
>;
export type OpenSourceScreenRouteProps = RouteProp<SettingStackParamList, 'OpenSourceScreen'>;

export type OpenSourceDetailScreenNavigationProps = NavigationProp<
    SettingStackParamList,
    'OpenSourceDetailScreen'
>;
export type OpenSourceDetailScreenRouteProps = RouteProp<
    SettingStackParamList,
    'OpenSourceDetailScreen'
>;
