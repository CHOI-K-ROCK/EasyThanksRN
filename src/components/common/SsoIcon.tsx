import React, { useCallback } from 'react';

import GoogleIcon from '../../../assets/images/logos/profile_sso_google.png';
import NaverIcon from '../../../assets/images/logos/profile_sso_naver.png';
import KakaoIcon from '../../../assets/images/logos/profile_sso_kakao.png';

import { Image, ImageStyle, StyleProp } from 'react-native';

import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import { SsoProviderType } from 'types/models/user';

type Props = {
    provider: SsoProviderType;
    style: StyleProp<ImageStyle>;
    onPress?: () => void;
};

const SsoIcon = (props: Props) => {
    const { provider, style, onPress } = props;

    const getSource = useCallback(() => {
        switch (provider) {
            case 'google':
                return GoogleIcon;
            case 'naver':
                return NaverIcon;
            case 'kakao':
                return KakaoIcon;
        }
    }, [provider]);

    return (
        <PushAnimatedPressable onPress={onPress} disabled={!onPress}>
            <Image source={getSource()} style={style} />
        </PushAnimatedPressable>
    );
};

export default SsoIcon;
