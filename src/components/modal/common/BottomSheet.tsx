import React from 'react';
import { View } from 'react-native';
import CustomText from '../common/CustomText';
import { ModalDataType } from '../../@types/models/modal';

const BottomSheet = (props: ModalDataType & { type: 'bottomSheet' }) => {
    const { id, content, buttons } = props;

    return <CustomText>bottom</CustomText>;
};

export default BottomSheet;
