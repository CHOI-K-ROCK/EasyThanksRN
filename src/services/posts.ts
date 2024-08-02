import { supabase } from './supabase';

import { PostDataType } from 'types/models/compose';

export const uploadPost = (postData: Partial<PostDataType>) =>
    new Promise(async (resolve, reject) => {
        try {
            const { data: userData } = await supabase.auth.getUser();
            const { user } = userData;

            if (!user) {
                throw Error('userdata is null');
            }

            const { data, error, status } = await supabase.from('posts').insert({
                ...postData,
            });

            if (error) {
                console.log(error);
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
