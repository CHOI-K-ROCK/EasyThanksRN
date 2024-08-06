import { supabase } from './supabase';

import { PostDataType } from 'types/models/compose';

// read
export const getPostById = (postId: string) =>
    new Promise<PostDataType>(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase
                .from('posts')
                .select()
                .eq('id', postId)
                .single();

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
                .gte('created_at', new Date().toISOString().slice(0, 10))
                .order('created_at', { ascending: false });

            if (error) {
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

export const getPostByMonth = (date: Date) =>
    new Promise<PostDataType[]>(async (resolve, reject) => {
        try {
            const currentMonth = date.getMonth();

            const beginDate = new Date(date);
            const endDate = new Date(date);

            beginDate.setDate(1);
            endDate.setMonth(currentMonth + 1);
            endDate.setDate(0);

            const { data, error, status } = await supabase
                .from('posts')
                .select('*')
                .gte('date', beginDate.toISOString().slice(0, 10))
                .lte('date', endDate.toISOString().slice(0, 10))
                .order('date', { ascending: false });

            if (error) {
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

// create / update
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
            console.log('upsert complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

// delete
export const deletePost = (postId: string) =>
    new Promise(async (resolve, reject) => {
        try {
            const { data, error, status } = await supabase.from('posts').delete().eq('id', postId);

            if (error) {
                throw new Error(`${error.message}, ${status}`);
            }
            console.log('delete complete');
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });

// subs

export const subscribePost = (postId: string, cb: (payload: any) => void) => {
    return supabase
        .channel('post_channel')
        .on(
            'postgres_changes',
            {
                schema: 'public',
                event: '*',
                table: 'posts',
                filter: `id=eq.${postId}`,
            },
            payload => {
                cb(payload);
            }
        )
        .subscribe();
};

export const subscribeDailyPost = (userId: string, cb: (payload: any) => void) => {
    return supabase
        .channel('daily_posts_channel')
        .on(
            'postgres_changes',
            {
                schema: 'public',
                event: '*',
                table: 'posts',
                filter: `author_id=eq.${userId}`,
            },
            payload => {
                cb(payload);
            }
        )
        .subscribe();
};

export const subscribeMonthlyPost = (userId: string, cb: (payload: any) => void) => {
    return supabase
        .channel('monthly_posts_channel')
        .on(
            'postgres_changes',
            {
                schema: 'public',
                event: '*',
                table: 'posts',
                filter: `author_id=eq.${userId}`,
            },
            payload => {
                cb(payload);
            }
        )
        .subscribe();
};
