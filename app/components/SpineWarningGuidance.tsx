'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import styles from './SpineWarningSection.module.css';

// 문단별 채움 색: 흰색 → 신뢰(푸른 기) → 흰색 + 노란 강조
const groups: { lines: ReactNode[]; className?: string }[] = [
    { lines: ['신경은 한 번 손상되면', '회복이 어렵습니다.'] },
    { className: styles.guidanceTrust, lines: ['연세척병원은 무조건적인', '수술을 권하지 않습니다.'] },
    {
        className: styles.guidanceClosing,
        lines: [
            '하지만',
            <><strong>&apos;반드시 수술이 필요한 순간&apos;</strong>에는</>,
            '숙련된 의료진이 가장 안전하고',
            '확실한 길을 제시합니다.',
        ],
    },
];

const lineCount = groups.reduce((sum, group) => sum + group.lines.length, 0);

// 스크롤 위치에 따라 각 줄이 왼쪽부터 순서대로 채워지는 문구
export default function SpineWarningGuidance() {
    const rootRef = useRef<HTMLElement>(null);
    const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const setFill = (progress: number) => {
            lineRefs.current.forEach((line, i) => {
                const fill = Math.min(1, Math.max(0, progress * lineCount - i));
                line?.style.setProperty('--fill', String(fill));
            });
        };

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setFill(1);
            return;
        }

        let frame = 0;
        const update = () => {
            frame = 0;
            const vh = window.innerHeight;
            const rect = root.getBoundingClientRect();
            // 블록 상단이 화면 85% 지점에 오면 시작, 하단이 화면 50% 지점에 오면 완료
            const start = vh * 0.85;
            const range = vh * 0.35 + rect.height;
            setFill((start - rect.top) / range);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, []);

    let index = 0;
    return (
        <aside ref={rootRef} className={styles.guidance} aria-label="연세척병원 치료 안내">
            {groups.map((group, g) => (
                <p key={g} className={group.className}>
                    {group.lines.map((line) => {
                        const i = index++;
                        return (
                            <span key={i} ref={(el) => { lineRefs.current[i] = el; }} className={styles.fillLine}>
                                <span className={styles.fillBase}>{line}</span>
                                <span className={styles.fillTop} aria-hidden="true">{line}</span>
                            </span>
                        );
                    })}
                </p>
            ))}
        </aside>
    );
}
