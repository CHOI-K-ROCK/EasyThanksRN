import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
//google
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

//naver
// import NaverLogin from '@react-native-seoul/naver-login';

import { UserDataType } from '../@types/models/user';

import {
    // APP_ENV_NAVER_AUTH_SECRET,
    // APP_ENV_NAVER_AUTH_KEY,
    // APP_ENV_SUPABASE_URL,
    APP_ENV_GOOGLE_WEB_CLIENT_ID,
    APP_ENV_GOOGLE_IOS_CLIENT_ID,
} from '@env';

import { supabase } from 'services/supabase';
import { getUserById } from 'services/users';

export const handleKakaoLogin = () =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            const kakaoToken = await kakaoLogin();

            if (!kakaoToken) {
                throw new Error('token is null');
            }
            // supabase auth
            const res = await supabase.auth.signInWithIdToken({
                provider: 'kakao',
                token: kakaoToken.idToken,
            });

            if (!res.data.user) {
                throw new Error('userdata is null');
            }

            const userData = await getUserById(res.data.user.id);

            resolve(userData);
        } catch (error) {
            console.log('kakao login error : ', error);
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

            if (!res.data.user) {
                throw new Error('userdata is null');
            }

            const userData = await getUserById(res.data.user.id);

            resolve(userData);
        } catch (error) {
            // console.log('google login error : ', error);
            reject(error);
        }
    });

// export const handleNaverLogin = () =>
//     new Promise<UserDataType>(async (resolve, reject) => {
//         const consumerKey = APP_ENV_NAVER_AUTH_KEY;
//         const consumerSecret = APP_ENV_NAVER_AUTH_SECRET;
//         const appName = 'EasyThanks - 이지땡스';
//         const serviceUrlSchemeIOS = 'com.rockwithsun.easythanks';
//         // 실제 배포단계에서는 키 전부 새로 발급 후 배포하기.

//         try {
//             NaverLogin.initialize({
//                 appName,
//                 consumerKey,
//                 consumerSecret,
//                 serviceUrlSchemeIOS,
//             });

//             await delay(100); // 초기화 함수 실행을 확실하게 하기 위해 추가

//             const { successResponse, failureResponse } = await NaverLogin.login();

//             if (failureResponse || !successResponse) {
//                 // 오류 발생인 경우 예외처리
//                 throw new Error(JSON.stringify(failureResponse));
//             }

//             const { accessToken } = successResponse;

//             // const res = await 서버로_보낼_요청(accessToken)

//             const { response: naverUserProfile } = await NaverLogin.getProfile(accessToken);
//             const { nickname, profile_image } = naverUserProfile;

//             // supabase auth

//             const user = {
//                 sso_provider: 'naver' as SsoProviderType,
//                 username: nickname,
//                 profile_img: profile_image,
//             };

//             resolve(user as any); // UserDataType
//         } catch (error) {
//             // console.log('naver login error : ', error);
//             reject(error);
//         }
//     });
