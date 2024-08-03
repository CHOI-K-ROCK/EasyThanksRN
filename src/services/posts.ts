import { supabase } from './supabase';

import { PostDataType } from 'types/models/compose';

export const updatePost = (postData: Partial<PostDataType>) =>
    new Promise(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase.from('posts').upsert({
                ...postData,
                updated_at: new Date().toISOString(),
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

export const getPostToday = () =>
    new Promise<PostDataType[]>(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase
                .from('posts')
                .select('*')
                .gte('created_at', new Date().toISOString().slice(0, 10));

            if (error) {
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
