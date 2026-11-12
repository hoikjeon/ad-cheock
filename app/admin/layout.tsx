import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '방문 통계 | 연세척병원 관리자',
    robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-[#f3f4f6] font-pretendard text-[#1c2433]">{children}</div>;
}
