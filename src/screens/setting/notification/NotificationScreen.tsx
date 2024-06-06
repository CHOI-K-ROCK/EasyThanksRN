import React from 'react';

import SafeAreaView from '../../../components/common/SafeAreaView';
import TempScreen from '../../../components/common/TempScreen';

type Props = {};

const NotificationScreen = (props: Props) => {
    const {} = props;

    return (
        <SafeAreaView>
            <TempScreen title="NotificationScreen" />
        </SafeAreaView>
    );
};

export default NotificationScreen;
