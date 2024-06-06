import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { SettingStackParamList } from '../settingStack';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeStack: undefined;
    SettingStack: NavigatorScreenParams<SettingStackParamList>;
};

export type MainTabParamList = {
    MainScreen: undefined;
    PostScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<RootStackParamList, 'MainTab'>;
