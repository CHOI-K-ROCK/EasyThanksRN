import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';

type Props = {};

const AppMenuScreen = (props: Props) => {
    const {} = props;

    return (
        <SafeAreaView>
            <TempScreen title="AppMenuScreen" />
        </SafeAreaView>
    );
};

export default AppMenuScreen;
