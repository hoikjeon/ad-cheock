import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Supabase가 잠들지 않도록 간단한 데이터 조회를 수행합니다.
        // 'consultations' 테이블에서 최신 데이터 1건을 조회하여 연결을 유지합니다.
        const { data, error } = await supabase
            .from('consultations')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Supabase keep-alive error:', error.message);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ 
            message: 'Supabase keep-alive request successful', 
            timestamp: new Date().toISOString(),
            data 
        });
    } catch (error: any) {
        console.error('Unexpected error during keep-alive:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
