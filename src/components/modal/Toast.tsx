import React from 'react';
import CustomText from '../common/CustomText';
import { ModalDataType } from '../../@types/models/modal';

type Props = {};

const Toast = (props: ModalDataType & { type: 'toast' }) => {
    const { id, content, duration } = props;

    return <CustomText>Toast</CustomText>;
};

export default Toast;
