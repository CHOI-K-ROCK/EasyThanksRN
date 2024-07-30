import {
    login,
    getProfile as getKakaoProfile,
    logout as kakaoLogout,
} from '@react-native-seoul/kakao-login';
//naver
import NaverLogin from '@react-native-seoul/naver-login';
//google
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import { delay } from '../utils/data';
import { SsoProviderType, UserDataType } from '../@types/models/user';

import {
    APP_ENV_NAVER_AUTH_SECRET,
    APP_ENV_NAVER_AUTH_KEY,
    APP_ENV_GOOGLE_WEB_CLIENT_ID,
    APP_ENV_GOOGLE_IOS_CLIENT_ID,
} from '@env';
import { supabase } from 'api/supabase';

export const handleKakaoLogin = () =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            const token = await login();

            // ---- temp ----
            const kakaoUserProfile = await getKakaoProfile();
            const { nickname, profileImageUrl } = kakaoUserProfile;

            // supabase auth

            const user = {
                ssoProvider: 'kakao' as SsoProviderType,
                username: nickname,
                profileImg: profileImageUrl,
            };

            // ---- ---- ----

            // 서버에 요청, 유효성 검증 이후 유저 생성 혹은 유저 데이터 반환
            // recoil selector 를 통해 비동기로 저장하는 것도 고려해보기
            // const res = await 서버로_보낼_요청(token)
            resolve(user); // UserDataType
        } catch (error) {
            // console.log('kakao login error : ', error);
            reject(error);
        }
    });

export const handleNaverLogin = () =>
    new Promise<UserDataType>(async (resolve, reject) => {
        const consumerKey = APP_ENV_NAVER_AUTH_KEY;
        const consumerSecret = APP_ENV_NAVER_AUTH_SECRET;
        const appName = 'EasyThanks - 이지땡스';
        const serviceUrlSchemeIOS = 'com.rockwithsun.easythanks';
        // 실제 배포단계에서는 키 전부 새로 발급 후 배포하기.

        try {
            NaverLogin.initialize({
                appName,
                consumerKey,
                consumerSecret,
                serviceUrlSchemeIOS,
            });

            await delay(100); // 초기화 함수 실행을 확실하게 하기 위해 추가

            const { successResponse, failureResponse } = await NaverLogin.login();

            if (failureResponse || !successResponse) {
                // 오류 발생인 경우 예외처리
                throw new Error(JSON.stringify(failureResponse));
            }

            const { accessToken } = successResponse;

            // const res = await 서버로_보낼_요청(accessToken)

            const { response: naverUserProfile } = await NaverLogin.getProfile(accessToken);
            const { nickname, profile_image } = naverUserProfile;

            // supabase auth

            const user = {
                ssoProvider: 'naver' as SsoProviderType,
                username: nickname,
                profileImg: profile_image,
            };

            resolve(user); // UserDataType
        } catch (error) {
            // console.log('naver login error : ', error);
            reject(error);
        }
    });

export const handleGoogleLogin = () =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            await GoogleSignin.hasPlayServices();
            GoogleSignin.configure({
                webClientId: APP_ENV_GOOGLE_WEB_CLIENT_ID,
                iosClientId: APP_ENV_GOOGLE_IOS_CLIENT_ID,
            });

            const { idToken } = await GoogleSignin.signIn();

            if (!idToken) {
                throw new Error('id Token is null');
            }

            const res = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: idToken,
            });

            console.log(res);
            // const res = await 서버로_보낼_요청(idToken)

            // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // await auth().signInWithCredential(googleCredential);
            // const googleUserData = auth().currentUser!;

            // const { displayName, photoURL } = googleUserData;

            // supabase auth

            const user = {};
            // const user = {
            //     ssoProvider: 'google' as SsoProviderType,
            //     username: displayName,
            //     profileImg: photoURL,
            // };

            resolve(user); // UserDataType
        } catch (error) {
            // console.log('google login error : ', error);
            reject(error);
        }
    });

// 내부에 상태 업데이트하는 로직 필요.
// 로그인 직후 유저 정보는 전역 상태와 로컬 스토리지에 저장 필요
// 즉, 최초 앱 실행시 로컬스토리지에 유저정보가 있는 경우
// 해당 아이디를 로그인 되었다고 판단,
