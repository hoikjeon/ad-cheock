'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || submitting) return;
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                router.replace('/admin');
                router.refresh();
                return;
            }
            const body = await res.json().catch(() => null);
            setError(body?.error ?? '로그인하지 못했습니다. 잠시 후 다시 시도해주세요.');
        } catch {
            setError('네트워크 오류로 로그인하지 못했습니다.');
        }
        setSubmitting(false);
    };

    return (
        <main className="flex min-h-screen items-center justify-center px-4">
            <form onSubmit={handleSubmit} className="w-full max-w-[360px] rounded-2xl border border-[#e3e6eb] bg-white p-7 shadow-sm">
                <p className="text-[13px] font-semibold text-[#294f7e]">연세척병원 관리자</p>
                <h1 className="mt-1 text-[22px] font-bold tracking-tight">방문 통계</h1>
                <label htmlFor="admin-password" className="mt-6 block text-[13px] font-semibold text-[#5b6476]">비밀번호</label>
                <input
                    id="admin-password"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-[#d8dce3] px-4 py-3 text-[15px] outline-none focus:border-[#294f7e] focus:ring-2 focus:ring-[#294f7e]/15"
                />
                {error && <p className="mt-3 text-[13px] font-medium text-[#d14343]">{error}</p>}
                <button
                    type="submit"
                    disabled={submitting || !password}
                    className="mt-5 w-full rounded-xl bg-[#294f7e] py-3 text-[15px] font-bold text-white transition-colors hover:bg-[#213f66] disabled:opacity-50"
                >
                    {submitting ? '확인 중...' : '로그인'}
                </button>
            </form>
        </main>
    );
}
