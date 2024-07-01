import { useRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../recoil/user';
import { isSignedAtom } from '../recoil/system';

// kakao
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
//naver
import NaverLogin from '@react-native-seoul/naver-login';
//google
import auth from '@react-native-firebase/auth';

import { SsoProviderType, UserDataType } from '../@types/models/user';
import { handleGoogleLogin, handleKakaoLogin, handleNaverLogin } from '../logics/auth';

const useAuth = () => {
    const [userData, setUserData] = useRecoilState(userDataAtom);
    const setSigned = useSetRecoilState(isSignedAtom);

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
            setSigned(true);
        } catch (error) {
            console.log('sso login error => ', error);
        }
    };

    const handleLogout = async () => {
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
            setSigned(false);
        } catch (error) {
            console.log('logout error : ', error);
        }
    };

    return { ssoLogin, logout: handleLogout };
};

export default useAuth;
