// 방문 통계에서 쓰는 섹션·버튼·신청 단계 목록. 키는 페이지의 data-track-* 속성과 같아야 합니다.
// 순서가 관리자 화면의 표시 순서입니다.

export type PageKey = 'spine' | 'ortho';
export type TrackKind = 'visit' | 'section' | 'click' | 'step';

export const PAGE_LABELS: Record<PageKey, string> = {
    spine: '척추',
    ortho: '정형외과',
};

export const SECTIONS: Record<PageKey, [key: string, label: string][]> = {
    spine: [
        ['hook', '첫 화면'],
        ['warning', '위험 신호'],
        ['ube', '양방향 척추내시경 설명'],
        ['edu', '의사를 가르치는 병원'],
        ['youtube', '연세척TV'],
        ['reasons', '특별한 이유'],
        ['lee', '이남 병원장'],
        ['kim', '김동한 병원장'],
        ['qa', 'Q&A'],
        ['location', '오시는 길'],
        ['conclusion', '마지막 멘트'],
    ],
    ortho: [
        ['hook', '첫 화면'],
        ['intro', '관절내시경 소개'],
        ['problem', 'MRI 정상인데 아픈 이유'],
        ['cartilage', '연골재생치료 과정'],
        ['solution', '원데이 관절내시경'],
        ['doctor', '최호 원장'],
        ['target', '추천 대상'],
        ['process', '시술 과정'],
        ['video', '시술 영상'],
        ['location', '오시는 길'],
        ['outro', '마지막 멘트'],
    ],
};

export const CLICKS: Record<PageKey, [key: string, label: string][]> = {
    spine: [
        ['naver_booking', '네이버 예약 (첫 화면)'],
        ['doctors', '의료진 바로보기 (첫 화면)'],
        ['phone', '전화번호 (오시는 길)'],
        ['consult_bottom', '상담 버튼 (화면 하단 고정)'],
        ['youtube_channel', '연세척TV 채널'],
        ['ortho_banner', '정형외과 페이지 배너'],
    ],
    ortho: [
        ['phone', '전화번호 (오시는 길)'],
        ['consult_bottom', '상담 버튼 (화면 하단 고정)'],
        ['spine_banner', '척추 페이지 배너'],
    ],
};

export const STEPS: [key: string, label: string][] = [
    ['open', '상담 창 열림'],
    ['submit', '신청 제출'],
    ['complete', '신청 완료'],
];

export function isAllowedName(page: PageKey, kind: TrackKind, name: string): boolean {
    if (kind === 'section') return SECTIONS[page].some(([key]) => key === name);
    if (kind === 'click') return CLICKS[page].some(([key]) => key === name);
    if (kind === 'step') return STEPS.some(([key]) => key === name);
    return false;
}
