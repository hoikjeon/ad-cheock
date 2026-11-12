import { NextResponse } from 'next/server';
import { isAllowedName, type PageKey, type TrackKind } from '../../lib/analytics';
import { getSupabaseAdmin } from '../../lib/supabaseAdmin';

export const dynamic = 'force-dynamic';

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse|vercel/i;
const ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;

function parseUserAgent(ua: string) {
    const device = /iPad|Tablet/i.test(ua) ? '태블릿' : /Mobi|Android|iPhone|iPod/i.test(ua) ? '모바일' : 'PC';
    const os = /iPhone|iPad|iPod/i.test(ua) ? 'iOS (아이폰)'
        : /Android/i.test(ua) ? '안드로이드'
        : /Windows/i.test(ua) ? 'Windows'
        : /Mac OS X|Macintosh/i.test(ua) ? 'macOS'
        : '기타';
    const browser = /Instagram/i.test(ua) ? '인스타그램 앱'
        : /FBAN|FBAV/i.test(ua) ? '페이스북 앱'
        : /KAKAOTALK/i.test(ua) ? '카카오톡'
        : /NAVER\(inapp/i.test(ua) ? '네이버 앱'
        : /SamsungBrowser/i.test(ua) ? '삼성 인터넷'
        : /Edg\//i.test(ua) ? '엣지'
        : /CriOS|Chrome/i.test(ua) ? '크롬'
        : /Safari/i.test(ua) ? '사파리'
        : '기타';
    return { device, os, browser };
}

function clip(value: unknown, max = 120) {
    return typeof value === 'string' && value.trim() ? value.trim().slice(0, max) : null;
}

function referrerHost(value: unknown, ownHost: string | null) {
    if (typeof value !== 'string' || !value) return null;
    try {
        const host = new URL(value).hostname.replace(/^www\./, '');
        return host && host !== ownHost?.replace(/^www\./, '') ? host : null;
    } catch {
        return null;
    }
}

// 방문 기록은 실패해도 페이지에 영향이 없도록 항상 204로 응답합니다.
export async function POST(request: Request) {
    const done = new NextResponse(null, { status: 204 });
    try {
        const ua = request.headers.get('user-agent') || '';
        if (!ua || BOT_UA.test(ua)) return done;

        const body = JSON.parse(await request.text());
        const id = body?.id;
        const page = body?.page as PageKey;
        const kind = body?.kind as TrackKind;
        const name = typeof body?.name === 'string' ? body.name : null;

        if (typeof id !== 'string' || !ID_PATTERN.test(id)) return done;
        if (page !== 'spine' && page !== 'ortho') return done;
        if (kind !== 'visit' && !(name && isAllowedName(page, kind, name))) return done;

        const meta: Record<string, string | null> = parseUserAgent(ua);
        if (kind === 'visit') {
            meta.utm_source = clip(body.utm_source);
            meta.utm_campaign = clip(body.utm_campaign);
            meta.utm_content = clip(body.utm_content);
            meta.referrer = referrerHost(body.referrer, request.headers.get('host'));
        }

        const supabase = getSupabaseAdmin();
        if (!supabase) return done;
        const { error } = await supabase.rpc('track_visit', {
            p_id: id, p_page: page, p_kind: kind, p_name: kind === 'visit' ? null : name, p_meta: meta,
        });
        if (error) console.error('방문 기록 실패:', error.message);
    } catch (error) {
        console.error('방문 기록 요청 오류:', error);
    }
    return done;
}
