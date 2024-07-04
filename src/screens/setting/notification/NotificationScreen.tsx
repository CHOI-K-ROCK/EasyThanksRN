import React from 'react';

import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from 'types/navigations/settingStack';

const NotificationScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const route = useRoute<UserProfileEditScreenRouteProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="알림" goBack={goBack} />
        </SafeAreaView>
    );
};

export default NotificationScreen;
