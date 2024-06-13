import { NavigationProp, RouteProp } from '@react-navigation/native';

// Compose
export type ComposeStackParamList = {
    ComposeScreen: { initialData?: any };
    EditLocationScreen: undefined;
};

export type ComposeScreenNavigationProps = NavigationProp<ComposeStackParamList, 'ComposeScreen'>;
export type ComposeScreenRouteProps = RouteProp<ComposeStackParamList, 'ComposeScreen'>;

export type EditLocationScreenNavigationProps = NavigationProp<
    ComposeStackParamList,
    'EditLocationScreen'
>;
export type EditLocationScreenRouteProps = RouteProp<ComposeStackParamList, 'EditLocationScreen'>;
