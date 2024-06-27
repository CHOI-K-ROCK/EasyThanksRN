import { getDefaultStore } from 'jotai';
import { userDataAtom } from '../state/user';
import { systemAtom } from '../state/system';

import {
    login,
    getProfile as getKakaoProfile,
    logout as kakaoLogout,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import auth from '@react-native-firebase/auth';

import { delay } from '../utils/data';

const store = getDefaultStore();

export const kakaoLogin = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const token = await login();

            // ---- temp ----
            const profile = await getKakaoProfile();
            const { nickname, profileImageUrl } = profile;

            const user = {
                username: nickname,
                profileImg: profileImageUrl,
            };

            // ---- ---- ----

            // 서버에 요청, 유효성 검증 이후 유저 생성 혹은 유저 데이터 반환
            // const res = await 서버로_보낼_요청(token)

            store.set(userDataAtom, user);
            store.set(systemAtom, { isSigned: true });

            resolve(user);
        } catch (error) {
            console.log('kakao login error : ', error);
            reject(undefined);
        }
    });
};

export const naverLogin = () => {
    return new Promise(async (resolve, reject) => {
        const consumerKey = 'ppND6ldhXb7KNVFZy35e';
        const consumerSecret = 'CQMshPUfvy';
        const appName = 'EasyThanks - 이지땡스';
        const serviceUrlSchemeIOS = 'com.rockwithsun.easythanks';
        // 실제 배포단계에서는 키 전부 새로 발급 후 배포하기.

        try {
            NaverLogin.initialize({
                appName,
                consumerKey,
                consumerSecret,
                serviceUrlSchemeIOS,
                // disableNaverAppAuthIOS: true,
            });

            await delay(100); // 초기화 함수 실행을 확실하게 하기 위해 추가

            const { successResponse, failureResponse } = await NaverLogin.login();

            if (failureResponse || !successResponse) {
                // 오류 발생인 경우 예외처리
                throw new Error(JSON.stringify(failureResponse));
            }

            const { accessToken } = successResponse;
            const userProfile = await NaverLogin.getProfile(accessToken);

            const {
                response: { nickname, profile_image },
            } = userProfile;

            const user = {
                nickname,
                profileImg: profile_image,
            };

            store.set(userDataAtom, user);
            store.set(systemAtom, { isSigned: true });

            resolve(user);
        } catch (error) {
            reject(undefined);
        }
    });
};

const googleLogin = () => { };

// 내부에 상태 업데이트하는 로직 필요.
// 로그인 직후 유저 정보는 전역 상태와 로컬 스토리지에 저장 필요
// 즉, 최초 앱 실행시 로컬스토리지에 유저정보가 있는 경우
// 해당 아이디를 로그인 되었다고 판단,

export const handleLogout = async () => {
    await kakaoLogout();
    await NaverLogin.logout();
    await auth().signOut();
    // 향후 유저의 provider 참고 후 해당하는 로직만 실행하게끔.

    const store = getDefaultStore();

    store.set(userDataAtom, null);
    store.set(systemAtom, { isSigned: false });
};
