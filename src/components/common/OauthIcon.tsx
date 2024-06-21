import React, { useCallback } from 'react';

import GoogleIcon from '../../../assets/images/logos/profile_oauth_google.png';
import NaverIcon from '../../../assets/images/logos/profile_oauth_naver.png';
import KakaoIcon from '../../../assets/images/logos/profile_oauth_kakao.png';

import { Image, ImageStyle, StyleProp } from 'react-native';
import { OauthProviderType } from '../../constant/dummy';
import PushAnimatedPressable from './PushAnimatedPressable';

type Props = {
    provider: OauthProviderType;
    style: StyleProp<ImageStyle>;
    onPress?: () => void;
};

const OauthIcon = (props: Props) => {
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

export default OauthIcon;
