import React from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import ImageCarousel from 'components/common/ImageCarousel';
import CustomText from 'components/common/CustomText';
import TextArea from 'components/common/TextArea';
import VectorIcon from 'components/common/VectorIcon';
import ComposeSummaryView from 'components/compose/ComposeSummaryView';
import HorizontalDivider from 'components/common/HorizontalDivider';
import BottomSheet from 'components/modal/bottomSheet/BottomSheet';
import CommonModal from 'components/modal/common/CommonModal';

import {
    PostDetailScreenNavigationProps,
    PostDetailScreenRouteProps,
} from 'types/navigations/postStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useOverlay from 'hooks/useOverlay';

import { commonStyles } from 'styles';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import BottomSheetMenuList from 'components/modal/bottomSheet/BottomSheetMenuList';

const PostDetailScreen = () => {
    const { colors } = useCustomTheme();
    const { navigate, goBack } = useNavigation<PostDetailScreenNavigationProps>();
    const { params } = useRoute<PostDetailScreenRouteProps>();

    const { postData } = params;
    const { title, content, photos, postId, createdAt } = postData;

    const IS_THERE_IMAGE = photos.length > 0;

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
                    { content: '아니요', onPress: closePostDeleteModal },
                    { content: '네', type: 'cancel', onPress: handleDeletePost },
                ]}
            />
        )
    );

    // handler
    const handlePressEdit = () => {
        navigate('ComposeStack', {
            screen: 'ComposeScreen',
            params: { initialData: postData },
        });
        closeMenu();
    };

    const handleDeletePost = async () => {
        console.log('delete', postId);
        closePostDeleteModal();
        closeMenu();
        goBack();
    };

    return (
        <SafeAreaView>
            <InnerNavigationBar
                screenTitle={title}
                goBack={goBack}
                rightComponent={<VectorIcon name="dots-vertical" size={25} onPress={openMenu} />}
            />
            <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                <ComposeSummaryView date={new Date(createdAt)} />
                <HorizontalDivider style={{ marginVertical: 15 }} />
                <View style={{ gap: 10 }}>
                    {IS_THERE_IMAGE && (
                        <View>
                            <CustomText style={styles.subject}>{`사진`}</CustomText>
                            <ImageCarousel images={photos} style={{ borderRadius: 5 }} />
                        </View>
                    )}
                    <View>
                        <CustomText style={styles.subject}>{`감사일기`}</CustomText>
                        <TextArea content={content} />
                    </View>
                    <View />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subject: {
        ...commonStyles.subject,
        marginBottom: 10,
    },
    navigationBarText: {
        fontSize: 15,
        fontWeight: 600,
    },
});

export default PostDetailScreen;
