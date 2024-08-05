import React, { useCallback, useEffect, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import ImageCarousel from 'components/common/ImageCarousel';
import CustomText from 'components/common/CustomText';
import TextArea from 'components/common/TextArea';
import VectorIcon from 'components/common/VectorIcon';
import ComposeSummaryView from 'components/compose/ComposeSummaryView';
import HorizontalDivider from 'components/common/HorizontalDivider';
import BottomSheet from 'components/overlay/bottomSheet/BottomSheet';
import CommonModal from 'components/overlay/modal/CommonModal';
import BottomSheetMenuList from 'components/overlay/bottomSheet/BottomSheetMenuList';

import {
    PostDetailScreenNavigationProps,
    PostDetailScreenRouteProps,
} from 'types/navigations/postStack';
import { PostDataType } from 'types/models/compose';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useOverlay from 'hooks/useOverlay';
import useLoading from 'hooks/useLoading';
import useToast from 'hooks/useToast';

import { deletePost, getPostById } from 'services/posts';

import { commonStyles } from 'styles';

const PostDetailScreen = () => {
    const { colors } = useCustomTheme();
    const { setLoading } = useLoading();
    const { openToast } = useToast();

    const { navigate, goBack } = useNavigation<PostDetailScreenNavigationProps>();
    const { params } = useRoute<PostDetailScreenRouteProps>();

    const [postData, setPostData] = useState<PostDataType | null>(null);

    const { postId } = params; // post id

    const getPostData = useCallback(async () => {
        try {
            setLoading(true);

            const res = await getPostById(postId);
            setPostData(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [postId, setLoading]);

    useEffect(() => {
        getPostData();
    }, [getPostData]);

    // overlays
    const { openOverlay: openMenu, closeOverlay: closeMenu } = useOverlay(() => (
        <BottomSheet closeBottomSheet={closeMenu}>
            <BottomSheetMenuList
                data={[
                    {
                        title: '수정',
                        onPress: handlePressEdit,
                        iconName: 'pencil',
                    },
                    {
                        title: '삭제',
                        onPress: openPostDeleteModal,
                        iconName: 'delete',
                        color: colors.warning,
                    },
                ]}
            />
        </BottomSheet>
    ));

    const { openOverlay: openPostDeleteModal, closeOverlay: closePostDeleteModal } = useOverlay(
        () => (
            <CommonModal
                title={'감사일기 삭제'}
                text={'삭제된 감사일기는 복구 할 수 없어요.\n정말로 삭제하시겠어요?'}
                onPressBackdrop={closePostDeleteModal}
                buttons={[
                    { content: '네', type: 'cancel', onPress: handleDeletePost },
                    { content: '아니요', onPress: closePostDeleteModal },
                ]}
            />
        )
    );

    // handler
    const handlePressEdit = () => {
        navigate('ComposeStack', {
            screen: 'ComposeScreen',
            params: { initialData: postData! },
        });
        closeMenu();
    };

    const handleDeletePost = async () => {
        try {
            setLoading(true);
            closePostDeleteModal();

            await deletePost(postId);

            closeMenu();
            goBack();
        } catch (error) {
            console.log(error);
            openToast({ text: '오류가 발생했어요. 잠시 후 다시 시도해 주세요.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    if (postData === null) return <></>;

    const IS_THERE_IMAGE = postData.photos.length > 0;

    return (
        <SafeAreaView>
            <InnerNavigationBar
                screenTitle={postData.title}
                goBack={goBack}
                rightComponent={<VectorIcon name="dots-vertical" size={25} onPress={openMenu} />}
            />
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                <ComposeSummaryView date={new Date(postData.date)} />
                <HorizontalDivider style={{ marginVertical: 15 }} />
                <View style={{ gap: 10 }}>
                    {IS_THERE_IMAGE && (
                        <View>
                            <CustomText style={commonStyles.subject}>{`사진`}</CustomText>
                            <ImageCarousel images={postData.photos} style={{ borderRadius: 5 }} />
                        </View>
                    )}
                    <View>
                        <CustomText style={commonStyles.subject}>{`감사일기`}</CustomText>
                        <TextArea content={postData.content} />
                    </View>
                    <View />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    navigationBarText: {
        fontSize: 15,
        fontWeight: 600,
    },
});

export default PostDetailScreen;
