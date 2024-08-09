import { supabase } from './supabase';
import { FileSystem } from 'react-native-file-access';

import { base64ToArrayBuffer } from 'utils/data';

export const uploadImage = (folder: string, name: string, file: string) =>
    new Promise<{ publicUrl: string }>(async (resolve, reject) => {
        try {
            const base64Image = await FileSystem.readFile(file, 'base64');
            const decoded = base64ToArrayBuffer(base64Image);

            const { data, error } = await supabase.storage
                .from('uploads')
                .upload(folder + '/' + name + '.png', decoded, {
                    cacheControl: '3600',
                    contentType: 'image/png',
                });

            if (data === null) {
                throw new Error('upload image data is null');
            }

            const { data: uriData } = supabase.storage.from('uploads').getPublicUrl(data.path);

            if (error) {
                throw new Error(`${error}`);
            }

            resolve(uriData);
        } catch (error) {
            console.log('uploadImage error : ', error);
            reject(error);
        }
    });

export const removeImage = (uris: string[]) =>
    new Promise<null>(async (resolve, reject) => {
        try {
            const { data, error } = await supabase.storage.from('uploads').remove(uris);

            if (error) {
                throw new Error(`${error.message}`);
            }

            resolve(null);
        } catch (error) {
            console.log('removeImage error : ', error);
            reject(error);
        }
    });
