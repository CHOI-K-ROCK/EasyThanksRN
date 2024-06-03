import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { AppMenuStackParamList } from '../appMenuStack';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeStack: undefined;
    AppMenuStack: NavigatorScreenParams<AppMenuStackParamList>;
};

export type MainTabParamList = {
    MainScreen: undefined;
    PostScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<RootStackParamList, 'MainTab'>;
