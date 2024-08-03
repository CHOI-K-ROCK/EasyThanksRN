import { UserDataType } from 'types/models/user';
import { supabase } from './supabase';

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
            const { data, error, status } = await supabase
                .from('users')
                .update(userData)
                .eq('id', uid);

            if (error) {
                console.log(error);
                throw new Error(`${error.message}, ${status}`);
            }

            resolve(data!);
        } catch (error) {
            reject(error);
        }
    });

// export const optOutUser = async (user) =>
//     new Promise<undefined>(async (resolve, reject) => {
//         try {
//             const { error } = await supabase.auth.admin.deleteUser();

//             if (error) {
//                 console.log(error);
//                 throw new Error(`${error.message}`);
//             }

//             resolve(undefined);
//         } catch (error) {
//             reject(error);
//         }
//     });
