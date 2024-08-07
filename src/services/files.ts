import { supabase } from './supabase';
import { FileSystem } from 'react-native-file-access';

import { base64ToArrayBuffer } from 'utils/data';

type FileUploadResponseType = {
    id: string;
    path: string;
    fullPath: string;
};

export const uploadImage = (folder: string, name: string, filePath: string) =>
    new Promise<FileUploadResponseType>(async (resolve, reject) => {
        try {
            const base64Image = await FileSystem.readFile(filePath, 'base64');
            const decoded = base64ToArrayBuffer(base64Image);

            const { data, error } = await supabase.storage
                .from('uploads')
                .upload(folder + '/' + name + '.png', decoded, {
                    cacheControl: '3600',
                    contentType: 'image/png',
                    upsert: true,
                });

            if (error) {
                console.log(error);
                throw new Error(`${error.message}`);
            }
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
