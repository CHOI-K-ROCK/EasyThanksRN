import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostDetailScreen from 'screens/post/PostDetailScreen';

const Stack = createNativeStackNavigator();

const PostStack = () => {
    // 포스트 디테일 - 컴포즈 스택(컴포즈 , 위치 수정 / 검색)

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
        </Stack.Navigator>
    );
};

export default PostStack;
