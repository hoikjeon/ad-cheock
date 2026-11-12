import type { PageKey, TrackKind } from './analytics';

// 브라우저 탭 하나에서 같은 페이지를 보는 동안을 방문 1건으로 셉니다.
const STORAGE_KEY = 'yc_visit_';

let current: { id: string; page: PageKey } | null = null;

function newId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

function send(body: Record<string, unknown>) {
    const json = JSON.stringify(body);
    try {
        if (navigator.sendBeacon?.('/api/track', new Blob([json], { type: 'application/json' }))) return;
    } catch {}
    fetch('/api/track', { method: 'POST', body: json, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {});
}

export function startVisit(page: PageKey) {
    let id: string | null = null;
    try { id = sessionStorage.getItem(STORAGE_KEY + page); } catch {}
    const isNew = !id;
    if (!id) {
        id = newId();
        try { sessionStorage.setItem(STORAGE_KEY + page, id); } catch {}
    }
    current = { id, page };

    if (isNew) {
        const params = new URLSearchParams(window.location.search);
        send({
            id, page, kind: 'visit',
            utm_source: params.get('utm_source'),
            utm_campaign: params.get('utm_campaign'),
            utm_content: params.get('utm_content'),
            referrer: document.referrer || null,
        });
    }
}

export function track(kind: Exclude<TrackKind, 'visit'>, name: string) {
    if (!current) return;
    send({ id: current.id, page: current.page, kind, name });
}
