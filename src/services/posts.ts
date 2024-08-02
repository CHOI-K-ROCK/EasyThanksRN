import { supabase } from './supabase';

import { PostDataType } from 'types/models/compose';

export const updatePost = (postData: Partial<PostDataType>) =>
    new Promise(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase.from('posts').upsert({
                ...postData,
            });

            if (error) {
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
