import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { SettingStackParamList } from '../settingStack';
import { ComposeStackParamList } from '../composeStack';
import { PostStackParamList } from '../postStack';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeStack: NavigatorScreenParams<ComposeStackParamList>;
    SettingStack: NavigatorScreenParams<SettingStackParamList>;
    PostStack: NavigatorScreenParams<PostStackParamList>;
};

// Main Tab
export type MainTabParamList = {
    MainScreen: undefined;
    PostScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<RootStackParamList, 'MainTab'>;
