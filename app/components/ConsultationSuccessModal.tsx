'use client';

import { useEffect, useRef } from 'react';

type ConsultationSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    variant?: 'blue' | 'teal';
};

const colorStyles = {
    blue: {
        header: 'from-blue-700 via-blue-600 to-cyan-500',
        badge: 'bg-blue-50 text-blue-700 ring-blue-100',
        icon: 'text-blue-600',
        dot: 'bg-blue-600',
        line: 'bg-blue-100',
        button: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200 shadow-blue-600/25',
    },
    teal: {
        header: 'from-teal-700 via-teal-600 to-emerald-500',
        badge: 'bg-teal-50 text-teal-700 ring-teal-100',
        icon: 'text-teal-600',
        dot: 'bg-teal-600',
        line: 'bg-teal-100',
        button: 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-200 shadow-teal-600/25',
    },
} as const;

export default function ConsultationSuccessModal({
    isOpen,
    onClose,
    variant = 'blue',
}: ConsultationSuccessModalProps) {
    const confirmButtonRef = useRef<HTMLButtonElement>(null);
    const colors = colorStyles[variant];

    useEffect(() => {
        if (!isOpen) return;

        confirmButtonRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 z-[70] flex items-center justify-center px-5 transition-all duration-300 ${
                isOpen
                    ? 'pointer-events-auto bg-slate-950/65 opacity-100 backdrop-blur-sm'
                    : 'pointer-events-none bg-slate-950/0 opacity-0'
            }`}
            onClick={onClose}
            aria-hidden={!isOpen}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="consultation-success-title"
                aria-describedby="consultation-success-description"
                className={`w-full max-w-[390px] overflow-hidden rounded-[30px] bg-white shadow-[0_28px_80px_-18px_rgba(15,23,42,0.55)] transition-all duration-300 ${
                    isOpen ? 'translate-y-0 scale-100' : 'translate-y-5 scale-95'
                }`}
                onClick={(event) => event.stopPropagation()}
            >
                <div className={`relative h-[132px] overflow-hidden bg-gradient-to-br ${colors.header}`}>
                    <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[28px] border-white/10" />
                    <div className="absolute -bottom-16 -left-8 h-36 w-36 rounded-full bg-white/10 blur-sm" />
                    <p className="relative px-7 pt-7 text-[13px] font-semibold tracking-[0.18em] text-white/75">
                        YONSEI CHUCK HOSPITAL
                    </p>
                    <p className="relative mt-2 px-7 text-lg font-bold text-white">상담 접수가 완료됐어요</p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white/80 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
                        aria-label="완료 팝업 닫기"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                        </svg>
                    </button>
                </div>

                <div className="relative px-7 pb-7 pt-14 text-center">
                    <div className="absolute left-1/2 top-0 flex h-[82px] w-[82px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_-8px_rgba(15,23,42,0.25)]">
                        <div className={`flex h-[62px] w-[62px] items-center justify-center rounded-full bg-current/10 ${colors.icon}`}>
                            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m5 12.5 4.2 4.2L19 7" />
                            </svg>
                        </div>
                    </div>

                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ${colors.badge}`}>
                        접수 완료
                    </span>
                    <h2 id="consultation-success-title" className="mt-3 text-[24px] font-extrabold tracking-[-0.03em] text-slate-900">
                        상담 신청이 완료되었습니다
                    </h2>
                    <p id="consultation-success-description" className="mt-2 text-[15px] leading-6 text-slate-500">
                        남겨주신 내용을 확인한 후<br />전문 상담원이 빠르게 연락드리겠습니다.
                    </p>

                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 text-left">
                        <div className="grid grid-cols-[16px_1fr] items-start gap-x-3">
                            <div className="flex h-full flex-col items-center pt-1.5">
                                <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
                                <span className={`my-1 h-7 w-px ${colors.line}`} />
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-slate-800">신청 내용 접수</p>
                                <p className="mt-0.5 text-xs text-slate-500">정상적으로 접수되었습니다.</p>
                                <p className="mt-4 text-sm font-bold text-slate-800">상담원 확인 후 연락</p>
                                <p className="mt-0.5 text-xs text-slate-500">입력하신 연락처로 순차 안내드립니다.</p>
                            </div>
                        </div>
                    </div>

                    <button
                        ref={confirmButtonRef}
                        type="button"
                        onClick={onClose}
                        className={`mt-6 w-full rounded-2xl py-4 text-base font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-4 active:translate-y-0 ${colors.button}`}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
