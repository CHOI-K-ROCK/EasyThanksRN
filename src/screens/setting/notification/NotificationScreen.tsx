import React from 'react';

import SafeAreaView from 'components/common/SafeAreaView';
import TempScreen from 'components/common/TempScreen';
import InnerNavigationBar from 'components/common/InnerNavigationBar';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '@types/navigations/settingStack';

const NotificationScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const route = useRoute<UserProfileEditScreenRouteProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="알림" goBack={goBack} />
            <TempScreen title="noti" />
        </SafeAreaView>
    );
};

export default NotificationScreen;
