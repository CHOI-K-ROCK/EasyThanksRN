import React, { useMemo } from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import { useNavigation } from '@react-navigation/native';
import { AppMenuScreenNavigationProps } from '../../@types/navigations/appMenuStack';
import AppMenuList from '../../components/appMenu/AppMenuList';
import ScreenLayout from '../../components/common/ScreenLayout';
import CustomText from '../../components/common/CustomText';
import { StyleSheet, View } from 'react-native';
import VectorIcon from '../../components/common/VectorIcon';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import useDimensions from '../../hooks/useDimensions';
import useCustomTheme from '../../hooks/useCustomTheme';

export type AppMenuDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const AppMenuScreen = () => {
    const { navigate, goBack } = useNavigation<AppMenuScreenNavigationProps>();
    const { colors } = useCustomTheme();
    const { hp, wp } = useDimensions();

    const POST_AMOUNT = 1;

    const handleLogout = () => {
        console.log('logout logic excute');
    };

    const menus: AppMenuDataType[] = useMemo(
        () => [
            {
                title: '알림',
                subtitle: '설정한 감사 알림을 확인 할 수 있습니다.',
                onPress: () => navigate('NotificationScreen'),
            },
            {
                title: '로그아웃',
                subtitle: '앱에서 로그아웃 합니다.',
                onPress: handleLogout,
            },
        ],
        [navigate]
    );

    const profileView = () => {
        const renderTotalPostText = (amount: number, due: number) => {
            if (amount < 1) {
                return (
                    // 작성한 글이 없을때
                    <View style={{ gap: 5 }}>
                        <CustomText>
                            아직 작성한 감사가 <CustomText style={{ fontWeight: 600, fontSize: 16 }}>없어요</CustomText>
                            🥲
                        </CustomText>
                        <CustomText>오늘 한번 작성해보시는 건 어떨까요?</CustomText>
                    </View>
                );
            } else {
                return (
                    // 작성한 글이 있을때
                    <View style={{ gap: 5 }}>
                        <CustomText>
                            <CustomText style={{ fontWeight: 600, fontSize: 16 }}>{due}</CustomText>일 동안 총{' '}
                            <CustomText style={{ fontWeight: 600, fontSize: 16 }}>{amount}</CustomText>개의 감사를
                            작성하셨어요!
                        </CustomText>
                    </View>
                );
            }
        };
        // amount, userdata
        return (
            <View
                style={{
                    // alignItems: 'center',
                    marginBottom: 15,
                }}
            >
                <View
                    style={{
                        width: 100,
                        aspectRatio: 1,
                        borderRadius: 15,
                        overflow: 'hidden',
                        alignSelf: 'center',
                        marginBottom: 20,
                        marginTop: 10,
                    }}
                >
                    {/* 프로필 이미지 임시 */}
                    <View style={{ backgroundColor: '#DDD', width: '100%', height: '100%' }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 5, columnGap: 3 }}>
                    <CustomText style={{ fontSize: 25, fontWeight: 600 }}>KROCK</CustomText>
                    <CustomText style={{ fontSize: 14 }}>님</CustomText>
                </View>
                {renderTotalPostText(2, 10)}
                {/* {renderTotalPostText(0, 10)} */}
            </View>
        );
    };

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'메뉴'} goBack={goBack} />
            <ScreenLayout>
                {profileView()}
                <View style={{ height: 20 }}>
                    <View
                        style={[
                            {
                                backgroundColor: colors.text,
                            },
                            styles.divider,
                        ]}
                    />
                </View>
                <AppMenuList menus={menus} />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        width: '100%',
        opacity: 0.2,
    },
});

export default AppMenuScreen;
