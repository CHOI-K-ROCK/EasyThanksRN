import { getDefaultStore, useSetAtom } from 'jotai';
import { userDataAtom } from '../state/user';
import { systemAtom } from '../state/system';

// kakao
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
//naver
import NaverLogin from '@react-native-seoul/naver-login';
//google
import auth from '@react-native-firebase/auth';

import { SsoProviderType, UserDataType } from '../@types/models/user';
import { handleGoogleLogin, handleKakaoLogin, handleNaverLogin } from './auth';

const store = getDefaultStore();

const useAuth = () => {
    const setUserData = useSetAtom(userDataAtom);
    const setSystem = useSetAtom(systemAtom);

    const ssoLogin = async (provider: SsoProviderType) => {
        try {
            let res: UserDataType;

            switch (provider) {
                case 'naver': {
                    res = await handleNaverLogin();
                    break;
                }
                case 'kakao': {
                    res = await handleKakaoLogin();
                    break;
                }
                case 'google': {
                    res = await handleGoogleLogin();
                    break;
                }
            }

            setUserData({ ...res });
            setSystem({ isSigned: true });
        } catch (error) {
            console.log('sso login error => ', error);
        }
    };

    const handleLogout = async () => {
        const userData = store.get(userDataAtom);
        console.log(userData);
        if (!userData) return;

        try {
            switch (userData.ssoProvider) {
                case 'kakao': {
                    console.log('excute kakao logout');
                    await kakaoLogout();
                    break;
                }
                case 'naver': {
                    console.log('excute naver logout');
                    await NaverLogin.logout();
                    break;
                }
                case 'google': {
                    console.log('excute google logout');
                    await auth().signOut();
                    break;
                }
            }

            setUserData(null);
            setSystem({ isSigned: false });
        } catch (error) {
            console.log('logout error : ', error);
        }
    };

    return { ssoLogin, logout: handleLogout };
};

export default useAuth;
