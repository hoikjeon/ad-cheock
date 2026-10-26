'use client';

import { createElement, useEffect, useRef, useState, type HTMLAttributes } from 'react';

type RevealProps = HTMLAttributes<HTMLElement> & {
    as?: 'section' | 'article' | 'header' | 'div';
    rootMargin?: string;
};

// 화면에 들어오면 data-revealed 속성을 한 번 붙여 CSS 등장 모션을 실행
export default function Reveal({ as = 'div', rootMargin = '0px 0px -12% 0px', children, ...rest }: RevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        if (!('IntersectionObserver' in window)) {
            setRevealed(true);
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setRevealed(true);
                observer.disconnect();
            }
        }, { rootMargin });
        observer.observe(el);
        return () => observer.disconnect();
    }, [rootMargin]);

    return createElement(as, { ...rest, ref, 'data-revealed': revealed || undefined }, children);
}
