import React, { useState } from 'react';

import { View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import ScreenLayout from 'components/common/ScreenLayout';

import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';

import { commonStyles } from 'styles';

import {
    DUMMY_POST_MULTI_IMAGE,
    DUMMY_POST_NONE_IMAGE,
    DUMMY_POST_SINGLE_IMAGE,
} from 'constants/dummy';
import { PostDataType } from 'types/models/compose';
import PostThumbnail from 'components/common/PostThumbnail';

const DUMMY_POSTS = [DUMMY_POST_NONE_IMAGE, DUMMY_POST_SINGLE_IMAGE, DUMMY_POST_MULTI_IMAGE];

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <ScreenLayout>
                <CustomText style={commonStyles.subject}>오늘 작성한 감사일기</CustomText>
                <View>
                    {DUMMY_POSTS.map((post: any) => {
                        return <PostThumbnail data={post} />;
                    })}
                </View>
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default MainScreen;
