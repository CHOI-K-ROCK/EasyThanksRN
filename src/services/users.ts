import { UserDataType } from 'types/models/user';
import { supabase } from './supabase';

export const getUserById = async (id: string) =>
    new Promise<UserDataType>(async (resolve, reject) => {
        try {
            const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

            if (error) {
                console.log(error);
                throw new Error(error.message);
            }

            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
