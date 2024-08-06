import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { userDataAtom } from '../states/user';
import { isSignedAtom } from '../states/system';

import { SsoProviderType, UserDataType } from '../@types/models/user';
import { handleGoogleLogin, handleKakaoLogin, handleSignOut } from '../logics/auth';
import { supabase } from 'services/supabase';
import { optOutUser } from 'services/users';
import { useCallback } from 'react';
import { monthlyPostAtom, todayPostAtom } from 'states/posts';

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

    const resetUserData = useResetRecoilState(userDataAtom);
    const resetTodayPost = useResetRecoilState(todayPostAtom);
    const resetMonthlyPost = useResetRecoilState(monthlyPostAtom);

    const clearData = useCallback(() => {
        resetUserData();
        resetTodayPost();
        resetMonthlyPost();

        setSigned(false);
    }, [resetMonthlyPost, resetTodayPost, resetUserData, setSigned]);

    const ssoLogin = async (provider: SsoProviderType) => {
        try {
            let res = {} as UserDataType;

            switch (provider) {
                case 'kakao': {
                    res = await handleKakaoLogin();
                    break;
                }
                case 'google': {
                    res = await handleGoogleLogin();
                    break;
                }
            }

            setUserData(res);
            setSigned(true);
        } catch (error) {
            console.log('sso login error => ', error);
        }
    };

    const handleLogout = async () => {
        if (userData.id === '') return;

        try {
            await handleSignOut(userData.sso_provider);

            clearData();
        } catch (error) {
            console.log('logout error : ', error);
        }
    };

    const handleOptOut = async () => {
        if (userData.id === '') return;

        try {
            await supabase.auth.signOut();
            await optOutUser(userData.id);

            clearData();
        } catch (error) {
            console.log('logout error : ', error);
        }
    };

    return { ssoLogin, logout: handleLogout, optOut: handleOptOut };
};

export default useAuth;
