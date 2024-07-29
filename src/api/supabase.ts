import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

import { APP_ENV_SUPABASE_KEY } from '@env';

const supabaseUrl = 'https://ymizppghrgkchbgkclgh.supabase.co';
const supabaseKey = APP_ENV_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});
