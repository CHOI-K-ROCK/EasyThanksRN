import {
    NavigationProp,
    NavigatorScreenParams,
    RouteProp,
} from '@react-navigation/native';

// Root
export type RootStackParamList = {
    MainTab: undefined;
    ComposeThanksStack: undefined;
};

export type MainTabParamList = {
    WelcomeScreen: undefined;
    PastThanksScreen: undefined;
};

export type RootStackNavigationProps = NavigationProp<RootStackParamList>;

export type MainTabNavigationProps = NavigationProp<
    RootStackParamList,
    'MainTab'
>;

// Compose
export type ComposeThanksStackParamList = {
    ComposeThanksScreen: undefined;
    // EditLocationScreen: undefined; // 추후 추가
};

export type ComposeThanksScreenNavigationProps = NavigationProp<
    ComposeThanksStackParamList,
    'ComposeThanksScreen'
>;
export type ComposeThanksScreenRouteProps = RouteProp<
    ComposeThanksStackParamList,
    'ComposeThanksScreen'
>;
