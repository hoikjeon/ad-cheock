import { CLICKS, PAGE_LABELS, SECTIONS, STEPS, type PageKey } from './analytics';

export type RangeKey = 'today' | '7d' | '30d' | 'weekly' | 'monthly';
export type PageFilter = PageKey | 'all';

export const RANGE_KEYS: RangeKey[] = ['today', '7d', '30d', 'weekly', 'monthly'];

export interface VisitRow {
    id: string;
    created_at: string;
    page: PageKey;
    device: string | null;
    os: string | null;
    browser: string | null;
    utm_source: string | null;
    utm_campaign: string | null;
    utm_content: string | null;
    referrer: string | null;
    sections: string[];
    steps: string[];
    clicks: Record<string, number>;
}

export interface ConsultRow {
    created_at: string;
    patient_name: string | null;
    phone: string | null;
    memo: string | null;
}

export interface BreakdownRow { label: string; visits: number; consults: number }
export interface BarRow { label: string; value: number; base: number }
export interface ClickRow { label: string; count: number; visits: number }

export interface Stats {
    generatedAt: string;
    compareLabel: string;
    summary: Record<'visits' | 'consults' | 'contacts', { value: number; compare: number }>;
    trend: { labels: string[]; visits: number[]; consults: number[] };
    funnel: BarRow[];
    contacts: BarRow[];
    clicks: ClickRow[];
    sections: BarRow[];
    devices: { device: BreakdownRow[]; os: BreakdownRow[]; browser: BreakdownRow[] };
    sources: { source: BreakdownRow[]; campaign: BreakdownRow[] };
    consultations: { createdAt: string; name: string; phone: string; memo: string; page: PageKey; duplicate: boolean }[];
}

// ----- 기간 계산 (한국 시간 기준) -----

const HOUR = 36e5;
const DAY = 24 * HOUR;
const KST = 9 * HOUR;

function kst(ms: number) {
    const d = new Date(ms + KST);
    return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate(), dow: d.getUTCDay() };
}

const midnight = (y: number, m: number, d: number) => Date.UTC(y, m, d) - KST;
const monthDay = (ms: number) => { const k = kst(ms); return `${k.m + 1}/${k.d}`; };

export function getRange(range: RangeKey, now = Date.now()) {
    const t = kst(now);
    const buckets: number[] = [];
    const labels: string[] = [];
    let start: number;
    let compareStart: number;
    let compareLabel: string;

    if (range === 'today') {
        start = midnight(t.y, t.m, t.d);
        compareStart = start - DAY;
        for (let h = 0; h < 24; h++) { buckets.push(start + h * HOUR); labels.push(`${h}시`); }
        compareLabel = '어제 같은 시각까지';
    } else if (range === '7d' || range === '30d') {
        const n = range === '7d' ? 7 : 30;
        start = midnight(t.y, t.m, t.d - (n - 1));
        compareStart = start - n * DAY;
        for (let i = 0; i < n; i++) { const b = midnight(t.y, t.m, t.d - (n - 1) + i); buckets.push(b); labels.push(monthDay(b)); }
        compareLabel = `직전 ${n}일 같은 시각까지`;
    } else if (range === 'weekly') {
        const monday = t.d - ((t.dow + 6) % 7);
        start = midnight(t.y, t.m, monday - 49);
        compareStart = start - 56 * DAY;
        for (let i = 0; i < 8; i++) { const b = midnight(t.y, t.m, monday - 49 + i * 7); buckets.push(b); labels.push(`${monthDay(b)}~`); }
        compareLabel = '직전 8주 같은 시점까지';
    } else {
        start = midnight(t.y, t.m - 5, 1);
        compareStart = midnight(t.y, t.m - 11, 1);
        for (let i = 0; i < 6; i++) { const b = midnight(t.y, t.m - 5 + i, 1); buckets.push(b); labels.push(`${kst(b).m + 1}월`); }
        compareLabel = '직전 6개월 같은 시점까지';
    }

    return { start, end: now, compareStart, compareEnd: compareStart + (now - start), buckets, labels, compareLabel };
}

// ----- 집계 -----

const TEST_NAME = /test|테스트/i;

export const consultPage = (memo: string | null): PageKey => (memo?.startsWith('[정형외과]') ? 'ortho' : 'spine');

// 테스트 신청을 빼고, 같은 연락처의 중복 신청을 표시합니다. (오래된 순 입력)
function markDuplicates(rows: ConsultRow[]) {
    const seen = new Set<string>();
    return rows
        .filter((r) => !TEST_NAME.test(r.patient_name ?? ''))
        .map((r) => {
            const key = (r.phone ?? '').replace(/\D/g, '') || `${r.patient_name}-${r.created_at}`;
            const duplicate = seen.has(key);
            seen.add(key);
            return { row: r, duplicate };
        });
}

function bucketIndex(ms: number, buckets: number[]) {
    for (let i = buckets.length - 1; i >= 0; i--) if (ms >= buckets[i]) return i;
    return -1;
}

const hasClick = (v: Pick<VisitRow, 'clicks'>, key: string) => (v.clicks?.[key] ?? 0) > 0;
const isContact = (v: Pick<VisitRow, 'clicks'>) => hasClick(v, 'phone') || hasClick(v, 'naver_booking');
const completed = (v: VisitRow) => v.steps.includes('complete');

function breakdown(visits: VisitRow[], label: (v: VisitRow) => string | null): BreakdownRow[] {
    const map = new Map<string, BreakdownRow>();
    for (const v of visits) {
        const key = label(v);
        if (!key) continue;
        const row = map.get(key) ?? { label: key, visits: 0, consults: 0 };
        row.visits += 1;
        if (completed(v)) row.consults += 1;
        map.set(key, row);
    }
    return Array.from(map.values()).sort((a, b) => b.visits - a.visits || b.consults - a.consults);
}

export function buildStats(input: {
    range: RangeKey;
    page: PageFilter;
    now?: number;
    visits: VisitRow[];
    compareVisits: Pick<VisitRow, 'clicks'>[];
    consults: ConsultRow[];
    compareConsults: ConsultRow[];
}): Stats {
    const { page, visits, compareVisits } = input;
    const r = getRange(input.range, input.now);
    const pages: PageKey[] = page === 'all' ? ['spine', 'ortho'] : [page];
    const prefix = (p: PageKey, label: string) => (page === 'all' ? `${PAGE_LABELS[p]} · ${label}` : label);
    const byPage = (rows: ConsultRow[]) => (page === 'all' ? rows : rows.filter((c) => consultPage(c.memo) === page));

    const consults = markDuplicates(byPage(input.consults));
    const uniqueConsults = consults.filter((c) => !c.duplicate);
    const compareUnique = markDuplicates(byPage(input.compareConsults)).filter((c) => !c.duplicate);

    const trendVisits = r.buckets.map(() => 0);
    const trendConsults = r.buckets.map(() => 0);
    for (const v of visits) {
        const i = bucketIndex(Date.parse(v.created_at), r.buckets);
        if (i >= 0) trendVisits[i] += 1;
    }
    for (const c of uniqueConsults) {
        const i = bucketIndex(Date.parse(c.row.created_at), r.buckets);
        if (i >= 0) trendConsults[i] += 1;
    }

    const total = visits.length;
    const funnel: BarRow[] = [
        { label: '페이지 방문', value: total, base: total },
        ...STEPS.map(([key, label]) => ({ label, value: visits.filter((v) => v.steps.includes(key)).length, base: total })),
    ];
    const contacts: BarRow[] = [
        { label: '전화번호 누름', value: visits.filter((v) => hasClick(v, 'phone')).length, base: total },
        { label: '네이버 예약 누름', value: visits.filter((v) => hasClick(v, 'naver_booking')).length, base: total },
    ];

    const clicks: ClickRow[] = pages.flatMap((p) => {
        const pageVisits = visits.filter((v) => v.page === p);
        return CLICKS[p].map(([key, label]) => ({
            label: prefix(p, label),
            count: pageVisits.reduce((sum, v) => sum + (v.clicks?.[key] ?? 0), 0),
            visits: pageVisits.filter((v) => hasClick(v, key)).length,
        }));
    });

    const sections: BarRow[] = pages.flatMap((p) => {
        const pageVisits = visits.filter((v) => v.page === p);
        return SECTIONS[p].map(([key, label]) => ({
            label: prefix(p, label),
            value: pageVisits.filter((v) => v.sections.includes(key)).length,
            base: pageVisits.length,
        }));
    });

    return {
        generatedAt: new Date(r.end).toISOString(),
        compareLabel: r.compareLabel,
        summary: {
            visits: { value: total, compare: compareVisits.length },
            consults: { value: uniqueConsults.length, compare: compareUnique.length },
            contacts: { value: visits.filter(isContact).length, compare: compareVisits.filter(isContact).length },
        },
        trend: { labels: r.labels, visits: trendVisits, consults: trendConsults },
        funnel,
        contacts,
        clicks,
        sections,
        devices: {
            device: breakdown(visits, (v) => v.device),
            os: breakdown(visits, (v) => v.os),
            browser: breakdown(visits, (v) => v.browser),
        },
        sources: {
            source: breakdown(visits, (v) => v.utm_source || v.referrer || '직접 방문 · 알 수 없음'),
            campaign: breakdown(visits, (v) => (v.utm_campaign || v.utm_content
                ? [v.utm_source || '-', v.utm_campaign || '-', v.utm_content || '-'].join(' · ')
                : null)),
        },
        consultations: consults
            .slice()
            .reverse()
            .slice(0, 100)
            .map(({ row, duplicate }) => ({
                createdAt: row.created_at,
                name: row.patient_name ?? '',
                phone: row.phone ?? '',
                memo: (row.memo ?? '').replace(/^\[정형외과\]\s*/, ''),
                page: consultPage(row.memo),
                duplicate,
            })),
    };
}
