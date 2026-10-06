import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// 개인정보 보유기간(수집일로부터 2년)이 지난 상담 신청 데이터를 삭제합니다.
// vercel.json 의 cron 설정으로 매일 1회 자동 실행됩니다.
const RETENTION_YEARS = 2;

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    // Vercel Cron 은 CRON_SECRET 을 Authorization 헤더로 보내줍니다. 외부에서 임의로 호출하지 못하도록 막습니다.
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || request.headers.get('authorization') !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    // 삭제 권한이 필요하므로 서버 전용 service_role 키를 사용합니다. (NEXT_PUBLIC_ 붙이지 말 것)
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceRoleKey) {
        return NextResponse.json({ error: 'Supabase service role key not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
    });

    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - RETENTION_YEARS);

    const { data, error } = await supabase
        .from('consultations')
        .delete()
        .lt('created_at', cutoff.toISOString())
        .select('id');

    if (error) {
        console.error('개인정보 자동 파기 실패:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const deletedCount = data?.length ?? 0;
    console.log(`개인정보 자동 파기 완료: ${deletedCount}건 (기준일 ${cutoff.toISOString()} 이전)`);

    return NextResponse.json({ deletedCount, cutoff: cutoff.toISOString() });
}
