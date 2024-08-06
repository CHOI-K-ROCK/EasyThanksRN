import { login as kakaoLogin } from '@react-native-seoul/kakao-login';
//google
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

import { UserDataType } from '../@types/models/user';

import { APP_ENV_GOOGLE_WEB_CLIENT_ID, APP_ENV_GOOGLE_IOS_CLIENT_ID } from '@env';

import { supabase } from 'services/supabase';
import { getUserById } from 'services/users';
import { getSupabaseAuthToken } from 'utils/storage';
import { AuthResponse, Session } from '@supabase/supabase-js';

// oauth

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
            reject(error);
        }
    });

// check session
export const checkSession = () =>
    new Promise<AuthResponse>(async (resolve, reject) => {
        try {
            const localSessionData = await getSupabaseAuthToken();

            if (!localSessionData) {
                throw Error('local session data is null');
            }

            const parsedSession = JSON.parse(localSessionData) as Session;

            const sessionRes = await supabase.auth.setSession({
                access_token: parsedSession.access_token,
                refresh_token: parsedSession.refresh_token,
            });

            resolve(sessionRes);
        } catch (error) {
            reject(error);
        }
    });
