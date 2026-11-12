'use client';

import { useEffect } from 'react';
import type { PageKey } from '../lib/analytics';
import { startVisit, track } from '../lib/track';

// 방문 시작을 기록하고, data-track-section 영역 도달과 data-track-click 요소 클릭을 기록합니다.
export default function VisitTracker({ page }: { page: PageKey }) {
    useEffect(() => {
        startVisit(page);

        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (!entry.isIntersecting) continue;
                observer.unobserve(entry.target);
                const key = (entry.target as HTMLElement).dataset.trackSection;
                if (key) track('section', key);
            }
        }, { rootMargin: '0px 0px -35% 0px' });
        document.querySelectorAll<HTMLElement>('[data-track-section]').forEach((el) => observer.observe(el));

        const onClick = (e: MouseEvent) => {
            const el = (e.target as Element | null)?.closest?.<HTMLElement>('[data-track-click]');
            const key = el?.dataset.trackClick;
            if (key) track('click', key);
        };
        document.addEventListener('click', onClick, true);

        return () => {
            observer.disconnect();
            document.removeEventListener('click', onClick, true);
        };
    }, [page]);

    return null;
}
