import { NavigationProp, RouteProp } from '@react-navigation/native';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeStack: undefined;
};

export type MainTabParamList = {
    MainScreen: undefined;
    PostArchiveScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<
    RootStackParamList,
    'MainTab'
>;

// Compose
export type ComposeStackParamList = {
    ComposeScreen: undefined;
    // EditLocationScreen: undefined; // 추후 추가
};

export type ComposeScreenNavigationProps = NavigationProp<
    ComposeStackParamList,
    'ComposeScreen'
>;
export type ComposeScreenRouteProps = RouteProp<
    ComposeStackParamList,
    'ComposeScreen'
>;
