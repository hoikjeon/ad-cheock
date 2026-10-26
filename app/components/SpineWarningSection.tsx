import Image from 'next/image';
import type { CSSProperties } from 'react';
import styles from './SpineWarningSection.module.css';
import Reveal from './Reveal';
import SpineWarningGuidance from './SpineWarningGuidance';

const regions = [
    {
        id: 'cervical',
        number: '01',
        name: '경추 · 목',
        title: '손의 움직임과 걸음걸이,',
        emphasis: '작은 변화도 살펴보세요.',
        mainAlt: '목의 경추와 디스크, 뒤쪽 신경 구조를 보여주는 해부학 일러스트',
        detailAlt: '경추 디스크와 척수의 위치 관계를 보여주는 단면 개념도',
        detailLabel: '경추 단면',
        symptoms: [
            ['손의 힘이 약해짐', '젓가락질이나 셔츠 단추 채우기가 전보다 어려워집니다.'],
            ['물건을 자주 놓침', '손에 쥔 컵이나 작은 물건을 자꾸 떨어뜨립니다.'],
            ['팔과 손의 저림', '목에서 팔이나 손으로 통증과 저림이 이어집니다.'],
            ['불안정한 걸음걸이', '걸을 때 다리에 힘이 빠지거나 균형 잡기가 어렵습니다.'],
        ],
    },
    {
        id: 'lumbar',
        number: '02',
        name: '요추 · 허리',
        title: '다리의 힘과 감각,',
        emphasis: '달라졌다면 확인하세요.',
        mainAlt: '허리의 요추와 골반, 디스크 주변 신경을 보여주는 해부학 일러스트',
        detailAlt: '요추 디스크와 척추관 안 신경 다발의 위치 관계를 보여주는 단면 개념도',
        detailLabel: '요추 단면',
        symptoms: [
            ['다리에 힘이 빠짐', '다리의 힘이 약해지거나 걷기가 어려워집니다.'],
            ['다리의 감각 변화', '엉덩이에서 다리로 저림이나 감각 저하가 이어집니다.'],
            ['회음부 감각 저하', '사타구니나 항문 주변의 감각이 평소와 다릅니다.'],
            ['대소변 기능 변화', '소변을 보기 어렵거나 소변·대변 조절에 변화가 생깁니다.'],
        ],
    },
];

function WarningIcon({ className }: { className?: string }) {
    return (
        <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M10.3 4.3a2 2 0 0 1 3.4 0l8 13.7a2 2 0 0 1-1.7 3H4a2 2 0 0 1-1.7-3l8-13.7Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M12 9v5m0 3v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

export default function SpineWarningSection() {
    return (
        <Reveal as="section" id="spine-warning-guide" aria-labelledby="spine-warning-title" className={styles.section} rootMargin="0px 0px -15% 0px">
            <header className={styles.header}>
                <span className={styles.badge}><WarningIcon /> 놓치지 말아야 할 위험 신호</span>
                <h2 id="spine-warning-title" className={styles.title}>
                    <span className={styles.titleLine}><span>몸이 보내는 경고,</span></span>
                    <span className={styles.titleLine}><span className={styles.titleAccent}>그냥 넘기지 마세요.</span></span>
                </h2>
                <p className={styles.intro}>
                    <span>통증뿐 아니라 힘과 감각의 변화까지.</span>
                    <span>목과 허리의 위험 신호를 확인하세요.</span>
                </p>
                <div className={styles.headerRule} aria-hidden="true"><span /></div>
            </header>

            <div className={styles.cards}>
                {regions.map((region) => (
                    <Reveal as="article" key={region.id} className={styles.card} aria-labelledby={`${region.id}-warning-title`}>
                        <div className={styles.cardHeader}>
                            <div className={styles.region}>
                                <span className={styles.number}>{region.number}</span>
                                <p className={styles.regionName}>{region.name}</p>
                            </div>
                            <span className={styles.cardBadge}><WarningIcon /> 위험 신호</span>
                        </div>

                        <figure className={styles.figure}>
                            <div className={styles.mainIllustration}>
                                <Image src={`/images/spine-warning/${region.id}-main.webp`} alt={region.mainAlt} width={1000} height={1000} sizes="(max-width: 640px) 64vw, 380px" className={styles.mainImage} />
                            </div>
                            <div className={styles.detail}>
                                <span className={styles.detailLabel}>{region.detailLabel}</span>
                                <div className={styles.detailCircle}>
                                    <Image src={`/images/spine-warning/${region.id}-detail.webp`} alt={region.detailAlt} width={600} height={600} sizes="(max-width: 640px) 29vw, 170px" />
                                    <svg className={styles.detailRing} viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="49" pathLength="100" /></svg>
                                </div>
                                <span className={styles.detailNote}><span /> 압박 부위 표현</span>
                            </div>
                        </figure>

                        <Reveal className={styles.cardBody}>
                            <h3 id={`${region.id}-warning-title`} className={styles.cardTitle}>{region.title} <span>{region.emphasis}</span></h3>
                            <ul className={styles.symptoms}>
                                {region.symptoms.map(([title, description], i) => (
                                    <li key={title} style={{ '--i': i } as CSSProperties}>
                                        <span className={styles.symptomMarker} aria-hidden="true">!</span>
                                        <div><h4>{title}</h4><p>{description}</p></div>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </Reveal>
                ))}
            </div>

            <SpineWarningGuidance />
        </Reveal>
    );
}
