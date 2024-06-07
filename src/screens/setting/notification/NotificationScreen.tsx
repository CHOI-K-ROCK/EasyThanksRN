import React from 'react';

import SafeAreaView from '../../../components/common/SafeAreaView';
import TempScreen from '../../../components/common/TempScreen';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';
import FullWidthButton from '../../../components/common/FullWidthButton';

const NotificationScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const route = useRoute<UserProfileEditScreenRouteProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="프로필 수정" goBack={goBack} />
            <TempScreen title="UserProfileEditScreen" />
        </SafeAreaView>
    );
};

export default NotificationScreen;
