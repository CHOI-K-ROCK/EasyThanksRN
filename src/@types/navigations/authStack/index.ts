import { NavigationProp, RouteProp } from '@react-navigation/native';

// auth
export type AuthStackParamList = {
    LoginScreen: undefined;
    SignInScreen: undefined;
};

export type LoginScreenNavigationProps = NavigationProp<
    AuthStackParamList,
    'LoginScreen'
>;
export type LoginScreenRouteProps = RouteProp<
    AuthStackParamList,
    'LoginScreen'
>;

export type SignInScreenNavigationProps = NavigationProp<
    AuthStackParamList,
    'SignInScreen'
>;
export type SignInScreenRouteProps = RouteProp<
    AuthStackParamList,
    'SignInScreen'
>;
