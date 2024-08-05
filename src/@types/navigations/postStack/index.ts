import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { ComposeStackParamList } from '../composeStack';

// auth
export type PostStackParamList = {
    PostDetailScreen: { postId: string };
    ComposeStack: NavigatorScreenParams<ComposeStackParamList>;
};

export type PostDetailScreenNavigationProps = NavigationProp<
    PostStackParamList,
    'PostDetailScreen'
>;
export type PostDetailScreenRouteProps = RouteProp<PostStackParamList, 'PostDetailScreen'>;
