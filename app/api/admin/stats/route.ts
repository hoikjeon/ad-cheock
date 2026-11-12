import { NextResponse } from 'next/server';
import type { SupabaseClient } from '@supabase/supabase-js';
import { isAdminRequest } from '../../../lib/adminAuth';
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin';
import { buildStats, getRange, RANGE_KEYS, type ConsultRow, type PageFilter, type RangeKey, type VisitRow } from '../../../lib/adminStats';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 1000;
const VISIT_COLUMNS = 'id, created_at, page, device, os, browser, utm_source, utm_campaign, utm_content, referrer, sections, steps, clicks';
const CONSULT_COLUMNS = 'created_at, patient_name, phone, memo';

// Supabase는 한 번에 최대 1000행을 돌려주므로 나눠서 모두 가져옵니다.
async function fetchAll<T>(
    supabase: SupabaseClient,
    table: string,
    columns: string,
    from: number,
    to: number,
    page?: PageFilter,
): Promise<T[]> {
    const rows: T[] = [];
    for (let offset = 0; ; offset += PAGE_SIZE) {
        let query = supabase
            .from(table)
            .select(columns)
            .gte('created_at', new Date(from).toISOString())
            .lt('created_at', new Date(to).toISOString())
            .order('created_at', { ascending: true })
            .range(offset, offset + PAGE_SIZE - 1);
        if (page && page !== 'all') query = query.eq('page', page);
        const { data, error } = await query;
        if (error) throw new Error(`${table}: ${error.message}`);
        rows.push(...(data as T[]));
        if (!data || data.length < PAGE_SIZE) return rows;
    }
}

export async function GET(request: Request) {
    if (!isAdminRequest()) return NextResponse.json({ error: '로그인이 필요합니다.' }, { status: 401 });

    const params = new URL(request.url).searchParams;
    const range = (RANGE_KEYS.includes(params.get('range') as RangeKey) ? params.get('range') : 'today') as RangeKey;
    const pageParam = params.get('page');
    const page: PageFilter = pageParam === 'spine' || pageParam === 'ortho' ? pageParam : 'all';

    const supabase = getSupabaseAdmin();
    if (!supabase) {
        return NextResponse.json({ error: 'SUPABASE_SERVICE_ROLE_KEY 환경변수가 설정되지 않았습니다.' }, { status: 500 });
    }

    const now = Date.now();
    const r = getRange(range, now);
    try {
        const [visits, compareVisits, consults, compareConsults] = await Promise.all([
            fetchAll<VisitRow>(supabase, 'visits', VISIT_COLUMNS, r.start, r.end + 1, page),
            fetchAll<Pick<VisitRow, 'clicks'>>(supabase, 'visits', 'clicks', r.compareStart, r.compareEnd + 1, page),
            fetchAll<ConsultRow>(supabase, 'consultations', CONSULT_COLUMNS, r.start, r.end + 1),
            fetchAll<ConsultRow>(supabase, 'consultations', CONSULT_COLUMNS, r.compareStart, r.compareEnd + 1),
        ]);
        return NextResponse.json(buildStats({ range, page, now, visits, compareVisits, consults, compareConsults }));
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error('관리자 통계 조회 실패:', message);
        const hint = message.includes('visits') ? ' (supabase/admin-analytics.sql 을 실행했는지 확인하세요)' : '';
        return NextResponse.json({ error: `통계를 불러오지 못했습니다: ${message}${hint}` }, { status: 500 });
    }
}
