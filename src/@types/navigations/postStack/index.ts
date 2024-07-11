import { NavigationProp, NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import { PostDataType } from 'types/models/compose';
import { ComposeStackParamList } from '../composeStack';

// auth
export type PostStackParamList = {
    PostDetailScreen: { postData: PostDataType };
    ComposeStack: NavigatorScreenParams<ComposeStackParamList>;
};

export type PostDetailScreenNavigationProps = NavigationProp<
    PostStackParamList,
    'PostDetailScreen'
>;
export type PostDetailScreenRouteProps = RouteProp<PostStackParamList, 'PostDetailScreen'>;
