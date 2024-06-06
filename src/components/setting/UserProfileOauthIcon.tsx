import React, { useCallback } from 'react';

import GoogleIcon from '../../../assets/images/logos/profile_oauth_google.png';
import NaverIcon from '../../../assets/images/logos/profile_oauth_naver.png';
import KakaoIcon from '../../../assets/images/logos/profile_oauth_kakao.png';
import { Image, ImageStyle } from 'react-native';
import { OauthProviderType } from '../../constant/dummy';

type Props = { provider: OauthProviderType; style: ImageStyle };
const UserProfileOauthIcon = (props: Props) => {
    const { provider, style } = props;

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

    return <Image source={getSource()} style={style} />;
};

export default UserProfileOauthIcon;
