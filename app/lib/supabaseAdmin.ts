import { createClient } from '@supabase/supabase-js';

// 서버 전용 service_role 클라이언트. 브라우저 코드에서 import 하지 마세요.
export function getSupabaseAdmin() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) return null;
    return createClient(url, key, { auth: { persistSession: false } });
}
