import React from 'react';
import { View } from 'react-native';
import CustomText from './CustomText';

type Props = {
    title: string;
};

const TempScreen = (props: Props) => {
    const { title } = props;

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <CustomText style={{ fontSize: 24, fontWeight: 600 }}>
                {title}
            </CustomText>
        </View>
    );
};

export default TempScreen;
