import { UserDataType } from 'types/models/user';
import { supabase } from './supabase';
import { uploadImage } from './files';

export const getUserById = async (id: string) =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase
                .from('users')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.log(error);
                throw new Error(`${error.message}, ${status}`);
            }

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

export const updateUserData = async (uid: string, userData: Partial<UserDataType>) =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            let newUserData = { ...userData };

            if (userData.profile_img) {
                const res = await uploadImage(`profiles`, uid, userData.profile_img);
                console.log(res);
                const { data } = supabase.storage.from('uploads').getPublicUrl(res.fullPath);
                console.log(data.publicUrl);
                newUserData.profile_img = data.publicUrl;
            }

            const { data, error, status } = await supabase
                .from('users')
                .update(newUserData)
                .eq('id', uid)
                .select()
                .single();

            if (error) {
                console.log(error);
                throw new Error(`${error.message}, ${status}`);
            }

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

export const optOutUser = async (userId: string) =>
    new Promise<undefined>(async (resolve, reject) => {
        try {
            const { error } = await supabase.auth.signOut();
            // 회원 탈퇴 -> service 키 이용하여 외부 서버에서 진행해야함.

            if (error) {
                console.log(error);
                throw new Error(`${error.message}`);
            }

            resolve(undefined);
        } catch (error) {
            reject(error);
        }
    });
