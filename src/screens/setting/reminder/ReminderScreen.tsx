import React from 'react';

import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';

import { useNavigation, useRoute } from '@react-navigation/native';
import {
    ReminderScreenNavigationProps,
    ReminderScreenRouteProps,
} from 'types/navigations/settingStack';

const ReminderScreen = () => {
    const { goBack } = useNavigation<ReminderScreenNavigationProps>();
    const route = useRoute<ReminderScreenRouteProps>();

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="감사 리마인더 설정" goBack={goBack} />
        </SafeAreaView>
    );
};

export default ReminderScreen;
