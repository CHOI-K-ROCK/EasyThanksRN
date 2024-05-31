import React from 'react';

import SafeAreaView from '../../../components/common/SafeAreaView';
import TempScreen from '../../../components/common/TempScreen';

type Props = {};

const NotificationSettingScreen = (props: Props) => {
    const {} = props;

    return (
        <SafeAreaView>
            <TempScreen title="NotificationSettingScreen" />
        </SafeAreaView>
    );
};

export default NotificationSettingScreen;
