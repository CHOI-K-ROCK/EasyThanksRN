import React from 'react';

import SafeAreaView from '../../../components/common/SafeAreaView';
import TempScreen from '../../../components/common/TempScreen';

type Props = {};

const UserOptOutScreen = (props: Props) => {
    const {} = props;

    return (
        <SafeAreaView>
            <TempScreen title="UserOptOutScreen" />
        </SafeAreaView>
    );
};

export default UserOptOutScreen;
