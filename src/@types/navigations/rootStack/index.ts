import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { SettingStackParamList } from '../settingStack';
import { ComposeStackParamList } from '../composeStack';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeStack: NavigatorScreenParams<ComposeStackParamList>;
    SettingStack: NavigatorScreenParams<SettingStackParamList>;
};

export type MainTabParamList = {
    MainScreen: undefined;
    PostScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<RootStackParamList, 'MainTab'>;
