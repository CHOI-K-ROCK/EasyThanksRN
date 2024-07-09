import { NavigationProp, RouteProp } from '@react-navigation/native';
import { PostDataType } from 'types/models/compose';

// auth
export type PostStackParamList = {
    PostDetailScreen: { postData: PostDataType };
};

export type PostDetailScreenNavigationProps = NavigationProp<
    PostStackParamList,
    'PostDetailScreen'
>;
export type PostDetailScreenRouteProps = RouteProp<PostStackParamList, 'PostDetailScreen'>;
