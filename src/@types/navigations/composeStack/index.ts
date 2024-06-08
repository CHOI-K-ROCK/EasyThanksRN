import { NavigationProp, RouteProp } from '@react-navigation/native';

// Compose
export type ComposeStackParamList = {
    ComposeScreen: { initialData?: any };
    // EditLocationScreen: undefined; // 추후 추가
};

export type ComposeScreenNavigationProps = NavigationProp<ComposeStackParamList, 'ComposeScreen'>;
export type ComposeScreenRouteProps = RouteProp<ComposeStackParamList, 'ComposeScreen'>;
