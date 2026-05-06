'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 설정 (환경 변수 사용)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const PRIVACY_POLICY = `개인정보취급방침 동의
연세척병원에서는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
연세척병원의 개인정보 위탁처리 기관 및 위탁업무 내용은 아래와 같습니다.

개인정보 수집 및 이용 수집주체 : 연세척병원
개인정보 수집항목 : 이름, 나이, 연락처, 거주지역
개인정보 수집 및 이용목적 : 연세척병원 상담 활용 (전화, 문자, SNS 등)
개인정보 보유 및 이용기간 : 수집일로부터 2년 (고객 동의 철회 시 지체 없이 파기)
개인정보 취급 위탁을 받는 자 : 연세척병원
개인정보 취급 위탁 업무 내용 : 고객정보 저장 및 서버 관리

* 상기 동의를 거부할 권리가 있으나, 수집 및 이용에 동의하지 않을 경우 상담 및 이벤트 참여가 불가능합니다.`;

const COLLECTION_POLICY = `개인정보 수집 및 이용에 대한 동의
연세척병원에서는 고객의 개인정보를 매우 소중하게 생각하며 정보주체의 권익을 보호하기 위하여 적법하고 적정하게 취급할 것입니다. 개인정보 보호법 및 동법 시행령 등 관련 법령을 준수하고 있습니다. 연세척병원은 제공하신 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보 보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.

■ 수집하는 개인정보의 항목
성명, 연락처, 지역, 추가내용(증상 등)

※ 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 정치적 성향, 범죄기록 등)는 수집하지 않습니다.

■ 개인정보의 수집 및 이용목적
연세척병원에서는 개인정보를 다음의 목적 이외의 용도로는 이용하지 않으며, 이용 목적이 변경될 경우에는 별도의 동의를 받아 처리하겠습니다.

전화, 문자, SNS를 이용한 서비스 상담, 이용 권유, 각종 서비스 및 이벤트 안내
테스트 결과 안내 및 경품 전달을 위한 정보 수집
이벤트 참가 신청, 참가 가능 여부, 당첨자 발표, 진행 사항에 대한 정보 전달

■ 개인정보의 처리 및 보유기간
수집일로부터 2년 혹은 위탁계약 종료 시 (고객 동의 철회 시 지체 없이 파기)
불량회원 관리 및 소비자보호에 관한 법률 등 타 법률에 의해 보존해야 할 필요가 있는 경우에는 일정 기간 보존합니다.

■ 동의 거부 권리 및 불이익 내용
귀하는 연세척병원에서 수집하는 개인정보에 대해 동의를 거부할 권리가 있으며, 동의 거부 시에는 상담 및 이벤트 등의 서비스 이용이 제한됩니다.

※ 위 개인정보는 연세척병원에서 제공하는 서비스를 이용하기 위해 필요한 최소한의 정보이므로 동의를 해주셔야만 원활한 서비스 이용이 가능합니다.`;

export default function OrthopedicPage() {

    const [showBottomNav, setShowBottomNav] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    // 스크롤 애니메이션 상태
    const [hookVisible, setHookVisible] = useState(false);
    const [problemVisible, setProblemVisible] = useState(false);
    const [solutionVisible, setSolutionVisible] = useState(false);
    const [doctorVisible, setDoctorVisible] = useState(false);
    const [targetVisible, setTargetVisible] = useState(false);
    const [processVisible, setProcessVisible] = useState(false);
    const [outroVisible, setOutroVisible] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [hookTextProgress, setHookTextProgress] = useState(0);
    const [outroTextProgress, setOutroTextProgress] = useState(0);
    const [arthroVisible, setArthroVisible] = useState(false);
    const [arthroTitleVisible, setArthroTitleVisible] = useState(false);
    const [cartiVisible, setCartiVisible] = useState(true);
    const [openStep, setOpenStep] = useState<number | null>(0);

    // Refs
    const hookRef = useRef<HTMLDivElement>(null);
    const problemRef = useRef<HTMLDivElement>(null);
    const solutionRef = useRef<HTMLDivElement>(null);
    const doctorRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);
    const outroRef = useRef<HTMLDivElement>(null);
    const hookTextRef = useRef<HTMLDivElement>(null);
    const outroTextRef = useRef<HTMLDivElement>(null);
    const arthroRef = useRef<HTMLDivElement>(null);
    const arthroTitleRef = useRef<HTMLDivElement>(null);
    const cartiRef = useRef<HTMLDivElement>(null);

    // 개인정보 입력을 위한 상태
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [memo, setMemo] = useState('');
    const [agreedPrivacy, setAgreedPrivacy] = useState(true);
    const [agreedCollection, setAgreedCollection] = useState(true);
    const [policyViewerType, setPolicyViewerType] = useState<'privacy' | 'collection' | null>(null);
    const [openDiseaseIdx, setOpenDiseaseIdx] = useState<number | null>(null);

    // 페이지 로딩 애니메이션
    useEffect(() => {
        const timer = setTimeout(() => setPageLoaded(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // 스크롤 연동 텍스트 효과
    useEffect(() => {
        const handleScroll = () => {
            if (hookTextRef.current) {
                const rect = hookTextRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const start = windowHeight * 0.85;
                const end = windowHeight * 0.35;
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                setHookTextProgress(progress * 100);
            }

            if (outroTextRef.current) {
                const rect = outroTextRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const start = windowHeight * 0.95;
                const end = windowHeight * 0.4;
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                setOutroTextProgress(progress * 100);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {


        const handleScroll = () => {
            setShowBottomNav(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);

        // Intersection Observers
        const createObserver = (setter: (v: boolean) => void, threshold = 0.1, rootMargin = '0px') => {
            return new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setter(true); },
                { threshold, rootMargin }
            );
        };

        const hookObs = createObserver(setHookVisible, 0.1);
        const problemObs = createObserver(setProblemVisible, 0.15);
        const solutionObs = createObserver(setSolutionVisible, 0.1);
        const doctorObs = createObserver(setDoctorVisible, 0.15, '0px 0px -50px 0px');
        const targetObs = createObserver(setTargetVisible, 0.1);
        const processObs = createObserver(setProcessVisible, 0.1);
        const outroObs = createObserver(setOutroVisible, 0.1);
        const arthroObs = createObserver(setArthroVisible, 0.1);
        const arthroTitleObs = createObserver(setArthroTitleVisible, 0.15);

        if (hookRef.current) hookObs.observe(hookRef.current);
        if (problemRef.current) problemObs.observe(problemRef.current);
        if (solutionRef.current) solutionObs.observe(solutionRef.current);
        if (doctorRef.current) doctorObs.observe(doctorRef.current);
        if (targetRef.current) targetObs.observe(targetRef.current);
        if (processRef.current) processObs.observe(processRef.current);
        if (outroRef.current) outroObs.observe(outroRef.current);
        if (arthroRef.current) arthroObs.observe(arthroRef.current);
        if (arthroTitleRef.current) arthroTitleObs.observe(arthroTitleRef.current);
        const cartiObs = createObserver(setCartiVisible, 0.1);
        if (cartiRef.current) cartiObs.observe(cartiRef.current);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            hookObs.disconnect();
            problemObs.disconnect();
            solutionObs.disconnect();
            doctorObs.disconnect();
            targetObs.disconnect();
            processObs.disconnect();
            outroObs.disconnect();
            arthroObs.disconnect();
            arthroTitleObs.disconnect();
            cartiObs.disconnect();
        };
    }, []);

    // 상담 신청 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone) { alert('성함과 연락처를 입력해주세요.'); return; }
        if (!memo) { alert('증상 부위를 선택해주세요.'); return; }
        if (!agreedPrivacy || !agreedCollection) { alert('개인정보 수집 및 이용에 동의해주세요.'); return; }
        if (isSubmitting) return;
        setIsSubmitting(true);

        const { error: dbError } = await supabase
            .from('consultations')
            .insert([{ patient_name: name, phone, memo: `[정형외과] ${memo}` }]);

        if (dbError) {
            console.error('DB 저장 에러:', dbError);
            alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
            try {
                const slackRes = await fetch('/api/slack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, memo: `[정형외과] ${memo}` }),
                });
                if (!slackRes.ok) console.error('슬랙 알림 전송 실패:', await slackRes.text());
            } catch (slackError) {
                console.error('슬랙 알림 에러:', slackError);
            }
            alert('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
            setName(''); setPhone(''); setMemo('');
            setAgreedPrivacy(true); setAgreedCollection(true);
            setIsPopupOpen(false);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="relative min-h-screen bg-gray-900 font-sans flex justify-center">
            {/* 페이지 로딩 프로그레스 바 */}
            <div className={`fixed top-0 left-0 h-[3px] bg-gradient-to-r from-teal-500 via-teal-400 to-emerald-400 z-[100] transition-all duration-1000 ease-out ${pageLoaded ? 'w-full opacity-0' : 'w-[70%] opacity-100'}`}></div>

            <div className="w-full max-w-[640px] bg-white relative pb-32 shadow-2xl overflow-x-hidden min-h-screen">

                {/* ===== 섹션 1: 히어로 Hook (도입부) ===== */}
                <section ref={hookRef} className={`w-full bg-[#0f172a] pt-14 pb-20 px-6 relative z-20 overflow-hidden transition-all duration-[1200ms] ease-out transform ${hookVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {/* 배경 효과 */}
                    <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-teal-600/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-gray-900 via-transparent to-transparent z-0"></div>

                    <div className="max-w-[500px] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-left">
                                <div className="inline-block bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mb-4">
                                    <span className="text-teal-400 text-[11px] font-bold tracking-[0.15em] uppercase">Yonsei Cheok · Orthopedic</span>
                                </div>
                                <h1 className="text-white text-[22px] md:text-[26px] font-extrabold leading-[1.4] mb-5 break-keep tracking-[-0.02em]">
                                    <span className="text-emerald-400 block mb-1.5">MRI 검사에서는 &apos;정상&apos;이라는데...</span>
                                    무릎 통증, 왜 계속될까요?
                                </h1>
                                <p className="text-gray-300 text-[15px] md:text-[17px] leading-[1.65] font-medium break-keep opacity-90">
                                    검사 결과는 깨끗하다지만, 계단을 오를 때나 앉았다 일어설 때 느껴지는 찌릿한 통증.<br />
                                    원인 모를 무릎 통증으로 고통받고 계시다면,<br />
                                    <span className="text-teal-400 font-extrabold underline decoration-2 underline-offset-8 decoration-teal-500/50">&apos;진단 방법&apos;을 바꿔야 할 때</span>입니다.
                                </p>
                            </div>
                            <div className="w-[120px] md:w-[170px] shrink-0 animate-float relative mt-4 md:mt-0">
                                <div className="absolute inset-[-20%] bg-teal-400/25 blur-[60px] rounded-full"></div>
                                <Image src="/images/knee-3d.png" alt="무릎 관절 이미지" width={500} height={500} className="object-contain relative z-10 drop-shadow-[0_20px_60px_rgba(13,148,136,0.5)]" />
                            </div>
                        </div>
                    </div>

                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes float {
                                0% { transform: translateY(0px) rotate(0deg); }
                                50% { transform: translateY(-12px) rotate(1deg); }
                                100% { transform: translateY(0px) rotate(0deg); }
                            }
                            .animate-float {
                                animation: float 5s ease-in-out infinite;
                            }
                            @keyframes scanRight {
                                0%   { transform: translateX(0px); }
                                40%  { transform: translateX(22px); }
                                60%  { transform: translateX(22px); }
                                100% { transform: translateX(0px); }
                            }
                            .animate-scan {
                                animation: scanRight 2.8s ease-in-out infinite;
                            }
                        `}} />
                </section>


                {/* ===== 섹션 2-B: 관절내시경 · 연골재생치료 소개 ===== */}
                <section className="w-full bg-white pt-24 pb-10 px-5 flex flex-col items-center justify-center text-center relative z-10 overflow-hidden">
                    {/* 캐치프레이즈 */}
                    <div ref={arthroRef} className={`font-pretendard font-extrabold text-[#0d5e4f] flex flex-col items-center gap-1 transition-opacity duration-1000 ease-in relative z-20 ${arthroVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-[18px] tracking-[0.5em] mb-1 opacity-60">· · · · ·</p>
                        <p className="text-[25px] tracking-tight">무릎, 어깨 속 문제 직접</p>
                        <p className="text-[27px] tracking-tight">직접 보고 치료합니다!</p>
                    </div>

                    {/* 배경 의사 사진 (choi.jpg) */}
                    <div className="relative w-[calc(100%+40px)] -ml-[20px] -mr-[20px] h-[200px] md:h-[260px] mt-4 mb-[-50px] md:mb-[-70px] z-10 pointer-events-none">
                        <Image
                            src="/images/choi.jpg"
                            alt="최호 원장"
                            fill
                            className="object-cover object-[center_15%]"
                        />
                        {/* 상단 페이드: 흰 배경과 자연스럽게 연결 */}
                        <div className="absolute inset-x-0 top-0 h-[35%] bg-gradient-to-b from-white to-transparent"></div>
                        {/* 하단 페이드: 타이틀 텍스트로 자연스럽게 연결 */}
                        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-white via-white/35 to-transparent"></div>
                    </div>

                    {/* 큰 타이틀 */}
                    <div ref={arthroTitleRef} className="mt-4 font-수퍼사이즈 flex flex-col items-center justify-center w-full relative z-20 leading-[1.2] tracking-tight transform -skew-x-[4deg] overflow-hidden">
                        <div className="flex flex-col items-center w-full" style={{ filter: 'drop-shadow(2px 2px 0px #9cafc3)' }}>
                            <div className={`text-[55px] bg-clip-text text-transparent bg-gradient-to-b from-[#0d5e4f] to-[#094035] text-center pt-2 px-4 pb-2 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform ${arthroTitleVisible ? 'translate-x-0 opacity-100' : '-translate-x-[50vw] opacity-0'}`}>
                                관절내시경
                            </div>
                            <div className={`text-[55px] bg-clip-text text-transparent bg-gradient-to-b from-[#0d5e4f] to-[#094035] mt-0 text-center whitespace-nowrap px-4 pb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform delay-100 ${arthroTitleVisible ? 'translate-x-0 opacity-100' : 'translate-x-[50vw] opacity-0'}`}>
                                연골재생치료
                            </div>
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full max-w-[420px] md:max-w-[480px] mt-2 mb-6 px-4">
                        <hr className="border-[#a6b5c9] border-t-[1px]" />
                    </div>

                    {/* 무릎관절내시경이란? 상세 */}
                    <div className="w-full max-w-[800px] flex flex-col items-center overflow-hidden">
                        {/* 헤더 타이틀 블록 */}
                        <div className={`w-full max-w-[280px] md:max-w-[340px] bg-gradient-to-b from-teal-700 to-teal-900 text-white px-2 py-2 flex items-center justify-center min-h-[40px] md:min-h-[46px] whitespace-nowrap overflow-hidden transition-all duration-1000 ease-out transform ${arthroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="font-pretendard font-bold text-[18px] sm:text-[20px] md:text-[22px] tracking-tight leading-none text-center">
                                무릎관절내시경이란?
                            </h3>
                        </div>

                        {/* 본문 콘텐츠 */}
                        <div className={`flex flex-col items-center justify-center gap-6 w-full mt-6 px-4 transition-all duration-1000 delay-300 ease-out transform ${arthroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* 이미지: knee-1 + kneescope 레이어드 */}
                            <div className="relative w-[220px] md:w-[300px] aspect-square">
                                <Image
                                    src="/images/knee-1.png"
                                    alt="무릎 관절"
                                    fill
                                    className="object-contain"
                                />
                                <div className="absolute top-[10%] right-[-40px] w-[77%] h-[77%] animate-scan">
                                    <Image
                                        src="/images/kneescope.png"
                                        alt="관절내시경 장비"
                                        fill
                                        className="object-contain drop-shadow-xl"
                                    />
                                </div>
                            </div>

                            {/* 설명 텍스트 */}
                            <div className="font-pretendard text-center flex flex-col space-y-4 shrink-0 max-w-[500px]">
                                <p className="text-[17px] md:text-[19px] font-semibold text-[#111111] tracking-tight leading-[1.5]">
                                    관절내시경은 관절 부위에<br />
                                    지름이 작은 내시경 장비가 달린 관을 삽입하여<br />
                                    <span className="text-teal-600 font-bold">관절 내부를 직접 관찰하는 방법</span>입니다.
                                </p>
                                <p className="text-[17px] md:text-[19px] font-semibold text-[#111111] tracking-tight leading-[1.5]">
                                    X-ray, MRI 등 영상 검사로는<br />
                                    확인이 어려운 관절 내부 병변을 정밀하게<br />
                                    진단할 수 있습니다.
                                </p>
                                <p className="text-[17px] md:text-[19px] font-semibold text-[#111111] tracking-tight leading-[1.5]">
                                    검사, 치료를 동시에 수행 가능한<br />
                                    <span className="text-teal-600 font-bold">최소 침습 수술법</span>입니다.
                                </p>

                                {/* 관절내시경 장점 인포그래픽 */}
                                <div className="w-full mt-16 md:mt-20">
                                    <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-teal-50/50 overflow-hidden relative">
                                        {/* 상단 포인트 라인 */}
                                        <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400 w-full absolute top-0 left-0"></div>
                                        
                                        <div className="p-6 md:p-8 pt-8 md:pt-10">
                                            <h3 className="text-center font-extrabold text-[24px] md:text-[28px] text-gray-900 mb-8 flex justify-center items-center gap-2 tracking-tight">
                                                <span className="text-teal-600">관절내시경</span> 장점
                                            </h3>
                                            
                                            {/* 장점 3가지 아이콘 리스트 */}
                                            <div className="grid grid-cols-3 gap-2 md:gap-5 mb-8 relative z-10">
                                                {[
                                                    { 
                                                        title: '빠른 회복', 
                                                        desc: '시술 후\n바로 일상복귀', 
                                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-teal-600"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                                                    },
                                                    { 
                                                        title: '최소 절개', 
                                                        desc: '2~3cm 절개\n흉터 최소화', 
                                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-teal-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                                                    },
                                                    { 
                                                        title: '정밀 진단', 
                                                        desc: '미세 손상\n발견 및 치료', 
                                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 md:w-8 md:h-8 text-teal-600"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
                                                    },
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex flex-col items-center text-center">
                                                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 flex items-center justify-center mb-3 shadow-sm border border-teal-100/50">
                                                            {item.icon}
                                                        </div>
                                                        <span className="font-extrabold text-[16px] md:text-[18px] text-gray-900 mb-1.5 tracking-tight">{item.title}</span>
                                                        <span className="text-[14px] md:text-[15px] text-gray-500 leading-[1.4] whitespace-pre-line break-keep">{item.desc}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            
                                            {/* 구분선 */}
                                            <div className="h-[1px] w-full bg-gray-100 mb-6"></div>

                                            {/* 체크 항목 */}
                                            <div className="flex flex-col gap-3">
                                                {[
                                                    { highlight: '짧은 검사 시간:', text: '입원 없이 당일 외래 치료 가능\n(30분~)' },
                                                    { highlight: '적용 대상:', text: '반월상 연골판 파열, 십자인대 손상,\n초기 퇴행성 관절염' },
                                                ].map((item, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 bg-gray-50/50 p-4 rounded-2xl border border-gray-100/60">
                                                        <div className="shrink-0 w-[24px] h-[24px] rounded-full bg-teal-500 flex items-center justify-center mt-0.5 shadow-sm">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <div className="flex items-start gap-1.5 text-[15px] md:text-[17px] text-gray-700 leading-[1.6] break-keep pt-[2px]">
                                                            {item.highlight && <span className="font-extrabold text-teal-800 shrink-0">{item.highlight}</span>}
                                                            <span className="whitespace-pre-line">{item.text}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 2: 문제 제기 (MRI의 한계) ===== */}
                <section ref={problemRef} className="w-full bg-[#1b2330] pt-16 pb-16 px-5 flex flex-col items-center justify-center relative z-10 overflow-hidden text-white">
                    <div className={`text-center transition-all duration-1000 ease-out transform ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center justify-center bg-amber-500/15 border border-amber-500/25 px-4 py-1.5 rounded-full mb-5">
                            <span className="text-amber-400 font-bold text-[14px] tracking-tight">분명 계속 아픈데... MRI 결과는 &apos;정상&apos;이라고요?</span>
                        </div>
                        <div ref={hookTextRef} className="relative text-[24px] md:text-[28px] font-extrabold leading-[1.35] tracking-[-0.02em] mb-4 break-keep text-left md:text-center w-full max-w-[400px] md:max-w-none mx-auto">
                            <h2 className="flex flex-col items-start md:items-center">
                                <span className="relative inline-block">
                                    <span className="text-white/20">정밀 검사의 대명사 MRI,</span>
                                    <span
                                        className="absolute top-0 left-0 w-full h-full text-white"
                                        style={{
                                            clipPath: `inset(0 ${100 - Math.min(100, hookTextProgress * 2)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.min(100, hookTextProgress * 2)}% 0 0)`
                                        }}
                                    >
                                        정밀 검사의 대명사 MRI,
                                    </span>
                                </span>
                                <span className="relative inline-block mt-0.5 md:mt-1">
                                    <span className="text-amber-500/30">하지만 완벽하지는 않습니다.</span>
                                    <span
                                        className="absolute top-0 left-0 w-full h-full text-amber-400"
                                        style={{
                                            clipPath: `inset(0 ${100 - Math.max(0, (hookTextProgress - 50) * 2)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, (hookTextProgress - 50) * 2)}% 0 0)`
                                        }}
                                    >
                                        하지만 완벽하지는 않습니다.
                                    </span>
                                </span>
                            </h2>
                        </div>
                        <p className="text-[15px] md:text-[16px] text-gray-300 font-medium leading-[1.7] break-keep max-w-[500px] mx-auto opacity-90 mt-6">
                            MRI는 뛰어난 검사 장비이지만, 무릎 관절 내부의 아주 미세한 연골 손상, 얇게 찢어진 인대, 혹은 관절 내 떠돌아다니는 작은 이물질(유리체) 등은 영상의학적 검사만으로는 명확히 잡아내기 어려울 수 있습니다.
                        </p>
                    </div>

                    {/* MRI vs 관절내시경 비교 카드 */}
                    <div className="w-full max-w-[500px] mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={`bg-[#232d3e] border border-[#2a374c] rounded-2xl p-5 shadow-lg transition-all duration-1000 delay-200 ease-out transform ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#324057]">
                                <div className="w-[38px] h-[38px] rounded-full bg-gray-500/10 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
                                        <path d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                                    </svg>
                                </div>
                                <h3 className="text-[16px] font-bold text-gray-400">MRI 검사</h3>
                            </div>
                            <ul className="space-y-2.5">
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                    <p className="text-[14px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">간접적 영상</span> 진단</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                    <p className="text-[14px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">미세 손상</span> 진단 한계</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                                    <p className="text-[14px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">진단만 가능</span>, 치료 별도</p>
                                </li>
                            </ul>
                        </div>
                        <div className={`bg-[#0d3d38] border border-teal-700/40 rounded-2xl p-5 shadow-lg transition-all duration-1000 delay-400 ease-out transform ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex items-center gap-3 mb-3 pb-3 border-b border-teal-600/30">
                                <div className="w-[38px] h-[38px] rounded-full bg-teal-500/15 flex items-center justify-center shrink-0">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-teal-400">
                                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-[16px] font-bold text-teal-400">관절내시경</h3>
                            </div>
                            <ul className="space-y-2.5">
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <p className="text-[14px] text-teal-200 leading-[1.5] break-keep"><span className="font-bold text-white">직접 눈으로</span> 확인하는 진단</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <p className="text-[14px] text-teal-200 leading-[1.5] break-keep"><span className="font-bold text-white">미세 손상까지</span> 발견 가능</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                    <p className="text-[14px] text-teal-200 leading-[1.5] break-keep"><span className="font-bold text-white">진단 + 치료</span> 동시 수행</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 관절내시경 발견 가능 주요 질환 */}
                    {(() => {
                        const diseases = [
                            {
                                kr: '슬개골 연골연화증', en: '슬개골 부정정렬',
                                desc: '무릎뼈(슬개골) 뒷면 연골이 물러지거나 닳는 질환과, 슬개골이 정상 궤도에서 벗어나 움직이는 상태입니다. 젊은 여성, 운동선수에서 흔합니다.',
                                symptoms: ['무릎 앞쪽(슬개골 주변) 둔통', '계단 오르내리기, 쪼그려 앉기, 오래 앉아 있을 때 통증("영화관 증후군")', '무릎을 굽혔다 펼 때 마찰음 또는 "사그락" 소리', '슬개골이 빠지는 느낌(아탈구감)', '무릎 앞쪽이 뻐근하고 힘이 빠지는 느낌']
                            },
                            {
                                kr: '반월상 연골 파열', en: 'Meniscus Tear',
                                desc: '무릎 관절 사이에 있는 초승달 모양의 연골판이 찢어지는 손상입니다. 스포츠 활동 중 무릎을 비틀거나 쪼그려 앉을 때 흔히 발생하며, 중장년층에서는 퇴행성 변화로도 생깁니다.',
                                symptoms: ['무릎 안쪽 또는 바깥쪽의 콕콕 찌르는 통증', '무릎을 굽히거나 펼 때 "뚝", "딸깍" 하는 소리(클릭음)', '갑자기 무릎이 안 펴지거나 움직임이 막히는 잠김 현상(locking)', '쪼그려 앉기, 계단 내려오기 시 통증 악화', '관절 부종(특히 손상 후 24~48시간 사이)']
                            },
                            {
                                kr: '십자인대 파열', en: 'ACL / PCL 손상',
                                desc: '무릎 안쪽에 X자 모양으로 교차하는 두 인대가 끊어지는 손상입니다. 전방십자인대(ACL)는 점프 후 착지나 급격한 방향 전환 시, 후방십자인대(PCL)는 정강이 앞쪽에 강한 충격을 받았을 때 잘 손상됩니다.',
                                symptoms: ['손상 순간 "퍽" 또는 "뚝" 하는 파열음', '즉각적인 심한 통증과 무릎 부종(혈관절증)', '무릎이 빠지는 느낌, 불안정감(giving way)', '계단 내려가기, 방향 전환 시 무릎이 흔들림', 'PCL 손상은 ACL보다 증상이 약해 만성기에 발견되기도 함']
                            },
                            {
                                kr: '측부인대 손상', en: 'MCL / LCL 손상',
                                desc: '무릎 안쪽(내측측부인대)과 바깥쪽(외측측부인대)을 잡아주는 인대 손상입니다. 무릎의 옆쪽으로 외력을 받았을 때 발생하며, 축구·격투기 같은 접촉 스포츠에서 흔합니다.',
                                symptoms: ['무릎 안쪽 또는 바깥쪽의 국소적 통증과 압통', '해당 부위 부종 및 멍', '옆으로 무릎을 벌릴 때 통증 또는 벌어지는 느낌', '보행 시 무릎이 옆으로 휘청거림', '3도 완전 파열 시 관절 불안정성 뚜렷']
                            },
                            {
                                kr: '관절 연골 손상', en: '박리성 골연골염',
                                desc: '관절 표면을 덮는 매끄러운 연골이 닳거나 떨어져 나가는 질환입니다. 박리성 골연골염은 연골 아래 뼈까지 함께 떨어져 조각이 관절 안을 떠다니는 상태로, 청소년기에 비교적 흔합니다.',
                                symptoms: ['활동 시 둔한 통증, 휴식하면 완화', '관절이 자주 붓고 뻣뻣함', '떨어진 조각이 관절에 끼면 갑자기 무릎이 잠김', '"걸리는" 느낌이나 마찰음(crepitus)', '진행 시 조기 퇴행성 관절염으로 이어질 수 있음']
                            },
                            {
                                kr: '추벽 증후군', en: 'Plica Syndrome',
                                desc: '태아 시기에 있던 관절막의 주름(추벽)이 성인이 된 후에도 남아 두꺼워지면서 염증을 일으키는 질환입니다. 반복적인 무릎 굽힘 동작(자전거, 등산, 계단)으로 악화됩니다.',
                                symptoms: ['슬개골(무릎뼈) 안쪽의 통증', '무릎을 굽혔다 펼 때 "툭" 걸리는 느낌', '오래 앉아 있다 일어설 때 무릎이 뻣뻣함', '운동 후 통증과 미세한 부종', '반월상 연골 파열과 증상이 비슷해 감별이 필요']
                            },
                            {
                                kr: '활막염', en: 'Synovitis',
                                desc: '관절 안쪽을 덮고 있는 활막이 염증을 일으켜 관절액이 과도하게 분비되는 상태입니다. 외상, 감염, 류마티스 질환, 통풍 등 다양한 원인으로 발생합니다.',
                                symptoms: ['관절이 따뜻하고 부풀어 오름', '만지면 말랑한 부종(관절 삼출액)', '움직일 때보다 가만히 있어도 둔한 통증', '관절 운동 범위 제한', '만성화 시 활막이 두꺼워지고 색조가 변함']
                            },
                            {
                                kr: '관절 내 유리체', en: 'Loose Body',
                                desc: '관절 안에 떨어져 나온 연골 조각, 뼛조각, 또는 활막에서 형성된 결체조직이 자유롭게 떠다니는 상태입니다. 박리성 골연골염, 외상, 퇴행성 관절염 등이 원인입니다.',
                                symptoms: ['갑작스럽고 예측 불가능한 무릎 잠김', '움직일 때마다 위치가 바뀌는 통증', '"무언가 굴러다니는" 느낌', '간헐적 부종', '조각이 끼는 위치에 따라 증상이 다양']
                            },
                            {
                                kr: '활막 조직 검사', en: '류마티스·감염성 관절염',
                                desc: '관절내시경은 진단이 모호한 관절염에서 활막을 직접 채취해 조직검사·균배양검사를 시행하는 데 사용됩니다.',
                                symptoms: ['류마티스 관절염: 아침에 1시간 이상 지속되는 관절 강직, 좌우 대칭성 다발성 관절 부종, 피로감·미열', '감염성 관절염: 갑작스러운 한 관절의 극심한 통증·열감·발적', '고열·오한 같은 전신 증상', '체중 부하 시 견디기 힘든 통증(응급 처치가 필요한 상황)']
                            },
                        ];
                        return (
                            <div className={`w-full max-w-[500px] mt-10 transition-all duration-1000 delay-500 ease-out transform ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="h-[1px] flex-1 bg-teal-700/50"></div>
                                    <p className="text-teal-400 text-[15px] font-bold tracking-wider whitespace-nowrap">관절내시경으로 발견 가능한 주요 질환</p>
                                    <div className="h-[1px] flex-1 bg-teal-700/50"></div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {diseases.map((item, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setOpenDiseaseIdx(i)}
                                            className="flex items-start gap-2.5 bg-white/5 border border-teal-700/30 rounded-xl px-3.5 py-3 text-left hover:bg-white/10 hover:border-teal-500/50 transition-colors group"
                                        >
                                            <div className="mt-[3px] shrink-0 w-4 h-4 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 text-teal-400">
                                                    <path d="M4.5 12.75l6 6 9-13.5" />
                                                </svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-[13px] font-bold leading-[1.3] break-keep">{item.kr}</p>
                                                <p className="text-teal-400/70 text-[11px] mt-0.5 leading-[1.3] break-keep">{item.en}</p>
                                            </div>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-teal-600 group-hover:text-teal-400 shrink-0 mt-1 transition-colors">
                                                <path d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-center text-teal-600/60 text-[11px] mt-3">각 질환을 탭하면 자세한 내용을 볼 수 있습니다</p>

                                {/* 질환 상세 모달 */}
                                {openDiseaseIdx !== null && (
                                    <div className="fixed inset-0 z-[200] flex items-end justify-center" onClick={() => setOpenDiseaseIdx(null)}>
                                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
                                        <div
                                            className="relative w-full max-w-lg bg-[#0f1c2e] border border-teal-700/40 rounded-t-3xl p-6 pb-10 max-h-[80vh] overflow-y-auto"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            {/* 핸들 */}
                                            <div className="w-10 h-1 bg-teal-700/50 rounded-full mx-auto mb-5" />
                                            {/* 헤더 */}
                                            <div className="flex items-start justify-between gap-3 mb-4">
                                                <div>
                                                    <p className="text-teal-400 text-[12px] font-bold tracking-widest uppercase mb-1">{diseases[openDiseaseIdx].en}</p>
                                                    <h3 className="text-white text-[20px] font-extrabold leading-tight">{diseases[openDiseaseIdx].kr}</h3>
                                                </div>
                                                <button onClick={() => setOpenDiseaseIdx(null)} className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mt-1">
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                                                        <path d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                            {/* 설명 */}
                                            <p className="text-gray-300 text-[14px] leading-[1.7] break-keep mb-5">{diseases[openDiseaseIdx].desc}</p>
                                            {/* 주요 증상 */}
                                            <div className="bg-teal-900/30 border border-teal-700/30 rounded-2xl p-4">
                                                <p className="text-teal-400 text-[12px] font-bold tracking-widest uppercase mb-3">주요 증상</p>
                                                <ul className="space-y-2.5">
                                                    {diseases[openDiseaseIdx].symptoms.map((s, si) => (
                                                        <li key={si} className="flex gap-2.5 items-start">
                                                            <div className="mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400" />
                                                            <p className="text-gray-200 text-[13px] leading-[1.6] break-keep">{s}</p>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* 브릿지 카피 */}
                    <div className={`w-full max-w-[500px] mt-10 bg-gradient-to-r from-teal-800/50 via-teal-700/50 to-teal-800/50 p-5 rounded-2xl border border-teal-400/20 text-center transition-all duration-1000 delay-400 ease-out transform ${problemVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-[15px] md:text-[16px] leading-[1.65] text-white break-keep opacity-95">
                            이것이 바로 검사 결과와 환자가 느끼는 통증 사이에<br />
                            <span className="text-emerald-300 font-extrabold">&apos;차이가 발생하는 이유&apos;</span>입니다.
                        </p>
                    </div>
                </section>

                {/* ===== 섹션 2-C: 연골재생치료 과정 ===== */}
                <section ref={cartiRef} className="w-full bg-[#f8f9fa] pt-16 pb-16 px-5 relative z-10">
                    <div className={`text-center mb-10 transition-all duration-1000 ease-out transform ${cartiVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-teal-600 font-bold text-[14px] tracking-widest uppercase mb-3">Cartilage Regeneration</p>
                        <h2 className="text-[26px] md:text-[30px] font-extrabold leading-[1.35] tracking-[-0.02em] text-black">
                            연골재생치료 과정
                        </h2>
                        <p className="text-[14px] text-gray-500 mt-2">관절내시경으로 직접 보며 진행하는 5단계 연골 치료</p>
                    </div>

                    <div className="w-full max-w-[500px] mx-auto">
                        {[
                            {
                                step: '01',
                                title: '관절강 내부 탐색',
                                desc: '초소형 내시경 카메라를 관절 내에 삽입하여 연골 손상 범위와 관절 전체 상태를 면밀히 파악합니다.',
                                img: '/images/kneescp1.png',
                            },
                            {
                                step: '02',
                                title: '손상 부위 정밀 확인',
                                desc: '내시경 모니터를 통해 연골 결손 부위를 직접 눈으로 확인하고 치료 방법과 범위를 결정합니다.',
                                img: '/images/kneescp2.png',
                            },
                            {
                                step: '03',
                                title: '손상 연골 제거 및 세척',
                                desc: '불안정하게 떨어진 연골 조각과 염증 조직을 깨끗이 제거하고 관절 내부를 세척하여 치료를 준비합니다.',
                                img: '/images/kneescp3.png',
                            },
                            {
                                step: '04',
                                title: '미세 천공술 시행',
                                desc: '연골 아래 뼈에 작은 구멍을 내어 골수 줄기세포가 흘러나오도록 유도, 새로운 연골 조직이 자랄 수 있는 환경을 만듭니다.',
                                img: '/images/kneescp4.png',
                            },
                            {
                                step: '05',
                                title: '연골 재생 완성',
                                desc: '줄기세포에서 새로운 연골 조직이 형성되어 손상된 관절면이 회복되고 통증이 감소합니다.',
                                img: '/images/kneescp5.png',
                            },
                        ].map((item, index, arr) => (
                            <div key={index} className="grid grid-cols-[56px_1fr] gap-x-4">
                                {/* 왼쪽: 원 + 라인 */}
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-extrabold text-[13px] shadow-lg border-4 border-white shrink-0 cursor-pointer transition-all duration-300 ${openStep === index ? 'bg-teal-500 scale-110' : 'bg-teal-600'}`}
                                        onClick={() => setOpenStep(openStep === index ? null : index)}
                                    >
                                        {item.step}
                                    </div>
                                    {index < arr.length - 1 && (
                                        <div className="flex-1 w-[2px] bg-gradient-to-b from-teal-500 to-teal-300 my-1"></div>
                                    )}
                                </div>

                                {/* 오른쪽: 아코디언 카드 */}
                                <div className="pb-4">
                                    <div
                                        className={`bg-white rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.07)] border overflow-hidden transition-all duration-300 cursor-pointer ${openStep === index ? 'border-teal-300' : 'border-gray-100'}`}
                                        onClick={() => setOpenStep(openStep === index ? null : index)}
                                    >
                                        {/* 항상 보이는 헤더 */}
                                        <div className="flex items-center justify-between px-4 py-3.5 gap-3">
                                            <h3 className={`text-[16px] font-bold tracking-tight transition-colors duration-300 ${openStep === index ? 'text-teal-600' : 'text-gray-900'}`}>
                                                {item.title}
                                            </h3>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className={`w-5 h-5 shrink-0 text-teal-500 transition-transform duration-300 ${openStep === index ? 'rotate-180' : ''}`}
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>

                                        {/* 펼쳐지는 콘텐츠 */}
                                        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${openStep === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="relative w-full aspect-[4/3]">
                                                <Image
                                                    src={item.img}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                                <span className="absolute bottom-3 left-4 text-white text-[12px] font-bold tracking-widest opacity-80">STEP {item.step}</span>
                                            </div>
                                            <div className="px-4 py-4 border-t border-gray-100">
                                                <p className="text-[14px] text-gray-600 leading-[1.65] break-keep">{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== 섹션 3: 핵심 솔루션 (원데이 관절내시경) ===== */}
                <section ref={solutionRef} className="w-full bg-white pt-16 pb-16 px-5 flex flex-col items-center justify-center text-center relative z-10 overflow-hidden">
                    <div className={`font-pretendard mb-10 transition-all duration-1000 ease-out transform ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-teal-600 font-bold text-[14px] tracking-widest uppercase mb-3">Core Solution</p>
                        <h2 className="text-[28px] md:text-[32px] font-extrabold leading-[1.35] tracking-[-0.02em] text-black mb-3">
                            보이지 않는 통증의 뿌리까지<br />직접 보고, 치료합니다.
                        </h2>
                        <div className="flex items-center justify-center gap-2 mt-4 mb-2">
                            <div className="h-1 w-10 bg-teal-500 rounded-full"></div>
                            <span className="text-[20px] md:text-[24px] font-extrabold text-teal-600">최호 원장의 &apos;원데이 관절내시경&apos;</span>
                            <div className="h-1 w-10 bg-teal-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* 특장점 4가지 카드 */}
                    <div className="w-full max-w-[480px] flex flex-col gap-4">
                        {[
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>,
                                title: '직접 보는 100% 확실한 진단',
                                desc: '2.5mm 이하의 초소형 고해상도 카메라를 관절 내부로 직접 삽입합니다. MRI로 놓친 숨은 병변까지 모니터로 생생하게 확대하여 확인합니다.',
                                color: 'teal'
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>,
                                title: 'MRI보다 정확한 진단',
                                desc: 'MRI보다 정확하게 직접 병변을 확인하고 진단합니다.',
                                color: 'emerald'
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>,
                                title: '최소 절개로 빠른 일상 복귀',
                                desc: '절개 부위가 매우 작아 출혈 및 감염 위험이 낮고, 흉터가 거의 남지 않으며 회복 속도가 압도적으로 빠릅니다.',
                                color: 'teal'
                            },
                            {
                                icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
                                title: '대기 없는 당일 원스톱 검사',
                                desc: '번거로운 예약 대기나 재방문 없이, 내원하신 당일에 필요한 모든 검사를 신속하게 진행하고 결과를 바로 확인할 수 있습니다.',
                                color: 'emerald'
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-left transition-all duration-1000 ease-out transform ${solutionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150 + 200}ms` }}
                            >
                                <div className="flex gap-4 items-start">
                                    <div className={`shrink-0 w-[48px] h-[48px] rounded-2xl flex items-center justify-center ${item.color === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-[17px] font-bold text-gray-900 mb-1.5 tracking-tight">{item.title}</h3>
                                        <p className="text-[14px] text-gray-600 leading-[1.6] break-keep">{item.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== 섹션 4: 최호 원장님 소개 ===== */}
                <section ref={doctorRef} className="w-full bg-[#0f172a] pt-48 md:pt-72 pb-16 md:pb-24 px-6 relative z-10 overflow-hidden">
                    {/* 상단 그라데이션 전환 */}
                    <div className="absolute top-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-b from-white to-[#0f172a] z-0 pointer-events-none opacity-100"></div>
                    <div className={`max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-1000 ease-out transform ${doctorVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                        {/* 이미지 영역 */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-[450px] aspect-[1/1.2] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="/images/cho.png"
                                    alt="최호 원장"
                                    fill
                                    className={`object-cover object-top transition-transform duration-[5000ms] ease-out ${doctorVisible ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className={`text-white text-4xl font-normal font-cafe24 tracking-wide ${doctorVisible ? 'animate-write' : 'opacity-0'}`}>
                                        Choi Ho
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="w-full md:w-1/2 text-white">
                            <div className="mb-4">
                                <p className="text-teal-400 text-[15px] font-bold mb-3 tracking-tight">&quot;당신의 무릎, 다시 가볍게 뛸 수 있도록&quot;</p>
                                <h2 className="text-[34px] md:text-[40px] font-extrabold leading-tight tracking-tight mb-4 break-keep">
                                    최호 <span className="text-[20px] md:text-[24px] font-medium ml-1 opacity-70 tracking-normal">원장</span>
                                </h2>
                                <div className="h-1.5 w-16 bg-teal-500 rounded-full mb-6"></div>
                            </div>

                            <div className="flex gap-3 flex-wrap mb-5">
                                <span className="inline-block bg-teal-600/20 text-teal-400 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider border border-teal-600/30 font-pretendard">경력사항</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "경희의대 졸업",
                                    "경희의료원 정형외과 수련",
                                    "경희대학교 의과대학 외래교수",
                                    "경희대학교 의학전문원 실습지도교수",
                                    "좋은 삼선병원 정형외과 수련 주임과장",
                                    "좋은 강안병원 정형외과 주임과장",
                                    "홍제병원 의무원장",
                                    "바로선정형외과 원장",
                                    "롯데자이언츠 주치의",
                                    "일본 가나자와 의과대학 병원 척추센터 연수",
                                    "척추관 협착증에 대한 최소감압술 논문 발표 (2002년 일본 나고야)",
                                    "국내·외 다수 논문 발표",
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-3 items-start group">
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-teal-600/20 border border-teal-500/30 flex items-center justify-center mt-[3px] group-hover:bg-teal-600/40 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                                        </div>
                                        <span className="text-[15px] md:text-[17px] font-medium leading-[1.6] text-gray-300 break-keep group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 5: 대상 환자 (이런 분들께 추천) ===== */}
                <section ref={targetRef} className="w-full bg-[#f8f9fa] pt-16 pb-16 px-5 relative z-10">
                    <div className={`flex flex-col gap-4 text-center font-pretendard mb-10 transition-all duration-1000 ease-out transform ${targetVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            이런 분들께<br /><span className="text-teal-600">관절내시경</span>을 추천합니다
                        </h2>
                    </div>

                    <div className="bg-white rounded-[32px] pt-8 pb-10 px-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100">
                        <div className="flex flex-col gap-4 md:gap-5 w-full max-w-[480px] mx-auto font-pretendard">
                            {[
                                "타 병원에서 검사를 받았으나 원인을 찾지 못하고 진통제만 드시는\u00A0분",
                                "무릎에서 자꾸 '딱딱' 거리는 파열음이 나고 무언가 걸리는 느낌이 드는\u00A0분",
                                "무릎이 자주 붓고 물이 차며, 특정 각도에서 극심한 통증이 있는\u00A0분",
                                "보존적 치료(물리치료, 주사 등)를 장기간 받았으나 호전이 없는\u00A0분",
                                "큰 수술(인공관절 등)이 부담스러워 수술을 미루고 계신\u00A0분",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-3 transition-all duration-1000 ease-out transform ${targetVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
                                    style={{ transitionDelay: `${index * 150 + 300}ms` }}
                                >
                                    <div className="shrink-0 w-[24px] h-[24px] mt-[2px] rounded-full border-[2.5px] border-teal-600 flex items-center justify-center bg-white shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-teal-600">
                                            <polyline points="20 6 9 17 4 12" className={`check-draw ${targetVisible ? 'animate' : ''}`} style={{ animationDelay: `${index * 150 + 500}ms` }}></polyline>
                                        </svg>
                                    </div>
                                    <p className="text-[16px] md:text-[18px] font-bold text-[#111111] leading-[1.4] break-keep tracking-tight">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 6: 시술 과정 (Process) ===== */}
                <section ref={processRef} className="w-full bg-white pt-16 pb-16 px-5 relative z-10">
                    <div className={`text-center font-pretendard mb-12 transition-all duration-1000 ease-out transform ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <p className="text-teal-600 font-bold text-[14px] tracking-widest uppercase mb-3">Process</p>
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            안전하고 체계적인<br />관절내시경 시술 과정
                        </h2>
                    </div>

                    <div className="w-full max-w-[480px] mx-auto flex flex-col gap-0 relative">
                        {/* 세로 연결 라인 */}
                        <div className="absolute left-[27px] top-[52px] bottom-[52px] w-[2px] bg-gradient-to-b from-teal-500 via-teal-400 to-emerald-500 z-0"></div>

                        {[
                            {
                                step: '01',
                                title: '정밀 상담 및 1차 진단',
                                desc: '현재 증상과 기존 검사 자료를 바탕으로 심층 상담을 진행합니다.',
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                        <path d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                                    </svg>
                                )
                            },
                            {
                                step: '02',
                                title: '관절내시경 진단 및 시술',
                                desc: '최소 마취 후, 관절내시경을 통한 정확한 병변 확인 및 동시 치료를 진행합니다.',
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                        <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                )
                            },
                            {
                                step: '03',
                                title: '사후 관리 및 재활',
                                desc: '시술 후 빠른 일상 복귀를 위한 맞춤형 재활 프로그램을 안내해 드립니다.',
                                icon: (
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
                                        <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                )
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`flex gap-5 items-start py-6 relative z-10 transition-all duration-1000 ease-out transform ${processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 200 + 300}ms` }}
                            >
                                <div className="shrink-0 w-[56px] h-[56px] rounded-full bg-teal-600 flex items-center justify-center text-white font-extrabold text-[14px] shadow-lg border-4 border-white">
                                    {item.icon}
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <span className="text-teal-600 font-extrabold text-[13px] tracking-wider">STEP {item.step}</span>
                                    </div>
                                    <h3 className="text-[18px] md:text-[20px] font-bold text-gray-900 mb-1.5 tracking-tight">{item.title}</h3>
                                    <p className="text-[14px] md:text-[15px] text-gray-600 leading-[1.6] break-keep">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ===== 유튜브 영상 섹션 ===== */}
                <section className="w-full bg-[#f8f9fa] pt-12 pb-16 px-5 relative z-10">
                    <div className="flex flex-col gap-6 text-center font-sans">
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            무릎 관절내시경<br />시술 영상
                        </h2>
                        <p className="text-base font-semibold leading-[1.4] tracking-[-0.02em] text-[#727582]">
                            실제 시술 과정을 영상으로 확인해보세요
                        </p>
                    </div>
                    <div className="mt-8 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 relative aspect-video">
                        {playingVideoId === 'ZxvYjaCGIrM' ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/ZxvYjaCGIrM?autoplay=1"
                                title="무릎 관절내시경 영상"
                                style={{ border: 'none' }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <button
                                onClick={() => setPlayingVideoId('ZxvYjaCGIrM')}
                                className="w-full h-full relative group cursor-pointer"
                            >
                                <img
                                    src="https://img.youtube.com/vi/ZxvYjaCGIrM/hqdefault.jpg"
                                    alt="무릎 관절내시경 영상 썸네일"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                    <div className="w-[72px] h-[50px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-0.5">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </button>
                        )}
                    </div>
                </section>

                {/* ===== 오시는 길 섹션 ===== */}
                <section className="w-full bg-white pt-16 pb-16 px-5 relative z-10 flex flex-col items-center justify-center font-pretendard">
                    <div className="flex flex-col gap-3 text-center mb-10 w-full">
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            오시는 길
                        </h2>
                    </div>
                    <div className="w-full max-w-full flex flex-col gap-8">
                        <div className="bg-[#f8f9fa] rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100">
                            <div className="flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-teal-600 mb-1">주소</span>
                                        <p className="text-[17px] font-bold text-gray-900 break-keep">
                                            부산광역시 부산진구 가야대로 715 (당감동)
                                        </p>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-gray-200 w-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-teal-600 mb-1">대표번호</span>
                                        <Link href="tel:051-935-1004" className="text-[22px] font-extrabold text-gray-900 hover:text-teal-600 transition-colors">
                                            051-935-1004
                                        </Link>
                                    </div>
                                </div>
                                <div className="h-[1px] bg-gray-200 w-full"></div>
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-teal-600/10 flex items-center justify-center text-teal-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-teal-600 mb-2">진료시간</span>
                                        <div className="text-[15px] font-medium text-gray-700 space-y-1">
                                            <p><span className="font-bold text-gray-900 inline-block w-[72px]">평일</span>09:00 ~ 17:30</p>
                                            <p><span className="font-bold text-gray-900 inline-block w-[72px]">토요일</span>09:00 ~ 13:00</p>
                                            <p><span className="font-bold text-red-500 inline-block w-[72px]">일·공휴일</span>휴진</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ===== 섹션 7: 마무리 CTA ===== */}
                <section ref={outroRef} className="w-full bg-[#fcfdfe] pt-20 pb-28 px-6 relative z-10 flex flex-col items-center justify-center text-center font-pretendard border-t border-gray-100">
                    <div className={`max-w-[600px] w-full transition-all duration-1000 ease-out transform ${outroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center justify-center bg-teal-50 text-teal-600 px-4 py-1.5 rounded-full mb-8 shadow-sm">
                            <span className="text-[14px] md:text-[16px] font-bold tracking-tight">
                                One-Day Arthroscopy
                            </span>
                        </div>

                        <div ref={outroTextRef} className="text-[26px] md:text-[34px] font-extrabold leading-[1.35] text-[#111111] tracking-[-0.03em] break-keep mb-10 w-full">
                            <h2 className="flex flex-col items-center gap-1 md:gap-2">
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10">통증의 원인을 알아야</span>
                                    <span
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{
                                            clipPath: `inset(0 ${100 - Math.min(100, outroTextProgress * 3)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.min(100, outroTextProgress * 3)}% 0 0)`
                                        }}
                                    >
                                        통증의 원인을 알아야
                                    </span>
                                </div>
                                <div className="grid place-items-center relative mt-2 md:mt-3">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10 whitespace-nowrap">
                                        <span className="text-teal-600 opacity-20">&apos;진짜 치료&apos;</span>가 시작됩니다.
                                    </span>
                                    <span
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden z-10"
                                        style={{
                                            clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (outroTextProgress - 33.3) * 1.5))}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (outroTextProgress - 33.3) * 1.5))}% 0 0)`
                                        }}
                                    >
                                        <span className="text-teal-600">&apos;진짜 치료&apos;</span>가 시작됩니다.
                                    </span>
                                    <span
                                        className="absolute bottom-1.5 left-0 h-3 bg-teal-600/15 z-0 origin-left"
                                        style={{
                                            width: '100%',
                                            transform: `scaleX(${Math.max(0, Math.min(1, (outroTextProgress - 75) * 4))})`
                                        }}
                                    ></span>
                                </div>
                            </h2>
                        </div>

                        <div className="text-[17px] md:text-[21px] font-bold leading-[1.7] text-gray-600 tracking-[-0.02em] break-keep">
                            <p className="mb-4 text-gray-800">
                                더 이상 참지 마세요.
                            </p>
                            <p>
                                연세척병원이 잃어버린<br />무릎의 건강을 되찾아 드리겠습니다.
                            </p>
                        </div>

                        {/* 척추 페이지 바로가기 */}
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 mt-10 bg-[#3b609c]/10 text-[#3b609c] px-6 py-3 rounded-full font-bold text-[15px] hover:bg-[#3b609c]/20 transition-colors border border-[#3b609c]/20"
                        >
                            ← 척추 양방향 내시경 페이지 보기
                        </Link>

                        <div className="mt-12 flex justify-center opacity-90 transition-transform hover:scale-105 duration-300">
                            <Image src="/images/logo.png" alt="연세척병원 로고" width={220} height={60} className="h-16 object-contain w-auto drop-shadow-sm" />
                        </div>
                    </div>
                </section>

                {/* ===== 하단 고정 버튼 ===== */}
                <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[640px] bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${showBottomNav ? 'translate-y-0' : 'translate-y-full'}`}>
                    <button
                        onClick={() => { if (!isPopupOpen) setIsPopupOpen(true); }}
                        className="w-full mx-auto block bg-gradient-to-r from-teal-600 to-teal-500 text-white font-bold text-xl py-5 rounded-2xl hover:from-teal-700 hover:to-teal-600 transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(13,148,136,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(13,148,136,0.5)] active:scale-[0.98] animate-pulse-gentle shine-effect"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
                                <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                            </svg>
                            간편 비용 문의 · 상담
                        </div>
                    </button>
                </div>

                {/* ===== 상담 신청 팝업 ===== */}
                <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 flex justify-center items-end ${isPopupOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => { setIsPopupOpen(false); setPolicyViewerType(null); }}>
                    <div className={`w-full max-w-[640px] max-h-[90dvh] bg-white rounded-t-3xl p-8 shadow-2xl transition-transform duration-500 ease-in-out relative overflow-y-auto ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={(e) => e.stopPropagation()}>

                        {/* 정책 상세보기 오버레이 */}
                        {policyViewerType && (
                            <div className="absolute inset-0 bg-white z-[60] flex flex-col animate-in slide-in-from-right duration-300">
                                <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
                                    <h3 className="font-bold text-lg text-gray-800">
                                        {policyViewerType === 'privacy' ? '개인정보취급방침' : '개인정보 수집 및 이용 동의'}
                                    </h3>
                                    <button onClick={() => setPolicyViewerType(null)} className="text-gray-400 hover:text-gray-800 p-2 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-6 text-[14px] text-gray-600 leading-relaxed whitespace-pre-wrap font-pretendard">
                                    {policyViewerType === 'privacy' ? PRIVACY_POLICY : COLLECTION_POLICY}
                                </div>
                                <div className="p-4 border-t border-gray-100">
                                    <button
                                        onClick={() => setPolicyViewerType(null)}
                                        className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">간편 비용 문의 · 상담 신청</h2>
                                <p className="text-gray-500 text-sm">아픈 곳을 남겨주시면 전문 상담원이 빠르게 연락드립니다.</p>
                            </div>
                            <button onClick={() => { setIsPopupOpen(false); setPolicyViewerType(null); }} className="text-gray-400 hover:text-gray-800 self-start p-1 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">환자 성함 <span className="text-red-500">*</span></label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">주요 증상 부위 <span className="text-red-500">*</span></label>
                                <div className="flex flex-wrap gap-2">
                                    {['무릎', '어깨', '팔꿈치', '손목', '기타'].map((symptom) => (
                                        <button
                                            key={symptom}
                                            type="button"
                                            onClick={() => setMemo(symptom)}
                                            className={`flex-1 min-w-[70px] py-3 px-3 rounded-xl border text-[15px] font-bold transition-all ${
                                                memo === symptom
                                                    ? 'bg-teal-600 border-teal-600 text-white shadow-md'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:bg-teal-50'
                                            }`}
                                        >
                                            {symptom}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 mt-1 border-t border-gray-100 pt-5">
                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer group"
                                        onClick={() => setAgreedPrivacy(!agreedPrivacy)}
                                    >
                                        <div className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-all ${agreedPrivacy ? 'bg-teal-600 border-teal-600 shadow-sm' : 'bg-white border-gray-300'}`}>
                                            {agreedPrivacy && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-[15px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors">개인정보취급방침 동의</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPolicyViewerType('privacy')}
                                        className="text-[13px] text-gray-400 hover:text-teal-600 transition-colors"
                                    >
                                        &lt;자세히보기&gt;
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer group"
                                        onClick={() => setAgreedCollection(!agreedCollection)}
                                    >
                                        <div className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-all ${agreedCollection ? 'bg-teal-600 border-teal-600 shadow-sm' : 'bg-white border-gray-300'}`}>
                                            {agreedCollection && (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className="text-[15px] font-medium text-gray-600 group-hover:text-gray-900 transition-colors">개인정보 수집 및 이용에 대한 동의</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setPolicyViewerType('collection')}
                                        className="text-[13px] text-gray-400 hover:text-teal-600 transition-colors"
                                    >
                                        &lt;자세히보기&gt;
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-bold py-4 rounded-xl mt-2 shadow-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}
                            >
                                {isSubmitting ? '처리 중...' : '상담 신청하기'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
