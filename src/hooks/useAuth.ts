import { useRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../states/user';
import { isSignedAtom } from '../states/system';

// kakao
import { logout as kakaoLogout } from '@react-native-seoul/kakao-login';
//naver
import NaverLogin from '@react-native-seoul/naver-login';
//google
import auth from '@react-native-firebase/auth';

import { SsoProviderType, UserDataType } from '../@types/models/user';
import { handleGoogleLogin, handleKakaoLogin, handleNaverLogin } from '../logics/auth';

/**
 *
 * Auth 와 관련된 동작의 메소드를 제공하는 훅입니다.
 *
 * @return 메소드를 반환하는 객체입니다.
 * @return ssoLogin - ssoProvider 를 전달 받아 그와 일치하는 로그인 과정을 진행합니다.
 * @return logout - 로그아웃 합니다.
 */
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

            console.log(res);

            setUserData({ ...res });
            // setSigned(true);
        } catch (error) {
            console.log('sso login error => ', error);
        }
    };

    const handleLogout = async () => {
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
