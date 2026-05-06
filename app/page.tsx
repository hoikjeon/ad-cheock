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

export default function MobileMain() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showBottomNav, setShowBottomNav] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [currentBookIndex, setCurrentBookIndex] = useState(0);
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
    const [activeYtIndex, setActiveYtIndex] = useState(0);
    const ytCarouselRef = useRef<HTMLDivElement>(null);

    const handleYtScroll = () => {
        const el = ytCarouselRef.current;
        if (!el) return;
        const scrollLeft = el.scrollLeft;
        const itemWidth = 335;
        const index = Math.round(scrollLeft / itemWidth);
        setActiveYtIndex(Math.min(index, 6));
    };

    const books = [
        { image: '/images/ube book-1.png', label: '양방향 척추내시경 교과서 Vol.1' },
        { image: '/images/ube book-2.png', label: '양방향 척추내시경 교과서 Vol.2' },
        { image: '/images/ube book-3.png', label: '최소침습 척추수술 교과서' }
    ];

    // Q&A 데이터 및 상태
    const qaData = [
        { q: "고령인데 수술이 가능할까요?", a: "네, 가능합니다. 최소침습으로 진행되어 출혈과 체력 소모가 적어 80대 이상 고령 환자분들도 안전하게 받을 수 있습니다." },
        { q: "주변에서 척추 수술은 함부로 하지 말라고 하는데, 괜찮을까요?", a: "과거 큰 절개 수술의 후유증 때문에 생긴 오해입니다. 양방향 내시경은 정상 근육과 뼈, 인대를 최대한 보존하므로 수술 후유증 위험이 매우 낮습니다." },
        { q: "전신마취는 너무 부담스러운데 괜찮을까요?", a: "대부분 하반신 부분 마취나 척추 마취로 진행하므로, 전신마취에 대한 부담이나 합병증 걱정을 크게 덜 수 있습니다." },
        { q: "수술 후 흉터가 크게 남지 않나요?", a: "허리에 약 5~7mm 정도의 작은 구멍 두 개만 내어 진행하므로, 회복 후에는 흉터가 거의 눈에 띄지 않습니다." },
        { q: "입원 기간은 얼마나 되며, 언제부터 걸을 수 있나요?", a: "보통 수술 당일이나 다음 날부터 보행이 가능하며, 2~3일 내에 퇴원하여 빠른 일상 복귀가 가능합니다." },
        { q: "당뇨나 고혈압 같은 만성질환이 있는데 수술이 가능한가요?", a: "절개 범위가 작아 출혈과 감염 위험이 낮기 때문에, 만성질환 환자분들도 내과적 관리와 함께 충분히 안전하게 수술받으실 수 있습니다." },
        { q: "디스크뿐만 아니라 심한 척추관 협착증도 내시경으로 치료되나요?", a: "네, 두 개의 구멍을 통해 한쪽으로는 내시경을, 다른 한쪽으로는 수술 기구를 넣어 넓은 시야를 확보하므로 심한 협착증이나 여러 마디 질환도 정밀하게 치료할 수 있습니다." },
        { q: "수술 후 재발 위험은 없나요?", a: "내시경으로 병변을 크게 확대하여 보며 원인을 근본적으로 제거하므로 재발률이 낮습니다. 다만, 수술 후 올바른 자세 유지와 코어 근육 관리는 필수입니다." }
    ];
    const [openQaIndex, setOpenQaIndex] = useState<number | null>(0);

    // 개인정보 입력을 위한 상태
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [memo, setMemo] = useState('');
    const [agreedPrivacy, setAgreedPrivacy] = useState(true);
    const [agreedCollection, setAgreedCollection] = useState(true);
    const [policyViewerType, setPolicyViewerType] = useState<'privacy' | 'collection' | null>(null);

    // 슬라이드 이미지 개수 (특별한 이유 섹션 1)
    const slideCount = 6;

    // 심포지엄 슬라이드 이미지 개수 (특별한 이유 섹션 3)
    // 이 숫자를 변경하면 해당 개수만큼 이미지를 자동으로 불러옵니다. (ex: /images/sympo1.jpg ~ sympo6.jpg)
    const sympoCount = 6;

    // 스크롤 애니메이션 상태
    const [ubeVisible, setUbeVisible] = useState(false);
    const [mainTitleVisible, setMainTitleVisible] = useState(false);
    const [catchphraseVisible, setCatchphraseVisible] = useState(false);
    const [spineCompareVisible, setSpineCompareVisible] = useState(false);
    const [benefitsVisible, setBenefitsVisible] = useState(false);
    const [eduVisible, setEduVisible] = useState(false);
    const [hookVisible, setHookVisible] = useState(false);
    const [leeCareerVisible, setLeeCareerVisible] = useState(false);
    const [kimCareerVisible, setKimCareerVisible] = useState(false);
    const [qaVisible, setQaVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);
    const [reasonsVisible, setReasonsVisible] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false);
    const [pageLoaded, setPageLoaded] = useState(false);
    const [parallaxOffset, setParallaxOffset] = useState(0);
    const [sliderPos, setSliderPos] = useState(50);
    const [countUpValues, setCountUpValues] = useState({ countries: 0, doctors: 0 });
    const [countStarted, setCountStarted] = useState(false);
    const [warningTextProgress, setWarningTextProgress] = useState(0);
    const [conclusionTextProgress, setConclusionTextProgress] = useState(0);
    const [eduTextProgress, setEduTextProgress] = useState(0);


    // 요소들이 화면에 보일 때 애니메이션을 트리거하기 위한 접근자(ref)
    const ubeRef = useRef<HTMLDivElement>(null);
    const mainTitleRef = useRef<HTMLDivElement>(null);
    const catchphraseRef = useRef<HTMLDivElement>(null);
    const spineCompareRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);
    const eduRef = useRef<HTMLDivElement>(null);
    const hookRef = useRef<HTMLDivElement>(null);
    const leeCareerRef = useRef<HTMLDivElement>(null);
    const kimCareerRef = useRef<HTMLDivElement>(null);
    const qaRef = useRef<HTMLDivElement>(null);
    const reviewRef = useRef<HTMLDivElement>(null);
    const reasonsRef = useRef<HTMLDivElement>(null);
    const warningRef = useRef<HTMLDivElement>(null);
    const warningTextRef = useRef<HTMLDivElement>(null);
    const conclusionTextRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);

    // 페이지 로딩 애니메이션
    useEffect(() => {
        const timer = setTimeout(() => setPageLoaded(true), 800);
        return () => clearTimeout(timer);
    }, []);

    // 패럴렉스 및 스크롤 연동 텍스트 효과
    useEffect(() => {
        const handleScroll = () => {
            setParallaxOffset(window.scrollY * 0.3);

            if (warningTextRef.current) {
                const rect = warningTextRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                // 화면의 85% 지점부터 내려오면서 35% 지점일 때 100% (완전 선명)
                const start = windowHeight * 0.85;
                const end = windowHeight * 0.35;
                
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                setWarningTextProgress(progress * 100);
            }

            if (conclusionTextRef.current) {
                const rect = conclusionTextRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const start = windowHeight * 0.95;
                const end = windowHeight * 0.4;
                
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                setConclusionTextProgress(progress * 100);
            }

            if (eduRef.current) {
                const rect = eduRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const start = windowHeight * 0.7;
                const end = windowHeight * 0.3;
                
                let progress = (start - rect.top) / (start - end);
                progress = Math.max(0, Math.min(1, progress));
                setEduTextProgress(progress * 100);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 카운트업 애니메이션
    useEffect(() => {
        if (!countStarted) return;
        const duration = 2000;
        const steps = 60;
        const interval = duration / steps;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCountUpValues({
                countries: Math.round(10 * eased),
                doctors: Math.round(50 * eased),
            });
            if (step >= steps) clearInterval(timer);
        }, interval);
        return () => clearInterval(timer);
    }, [countStarted]);

    useEffect(() => {
        setIsLoaded(true);

        // 메인 히어로 배경 이미지 자동 롤링 (5초마다, 4장 순환 - Ken Burns 효과)
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % 4);
        }, 5000);

        // 책 이미지 롤링 (5초마다)
        const bookInterval = setInterval(() => {
            setCurrentBookIndex((prev) => (prev + 1) % 3);
        }, 5000);

        // 스크롤에 따른 하단 네비게이션 표시 여부 제어
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowBottomNav(true);
            } else {
                setShowBottomNav(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Intersection Observer를 사용하여 스크롤 애니메이션 구현
        const ubeObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setUbeVisible(true);
            },
            { threshold: 0.1 }
        );
        if (ubeRef.current) ubeObserver.observe(ubeRef.current);

        const titleObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setMainTitleVisible(true);
            },
            { threshold: 0.5 }
        );
        if (mainTitleRef.current) titleObserver.observe(mainTitleRef.current);

        const catchphraseObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setCatchphraseVisible(true);
            },
            { threshold: 0.5 }
        );
        if (catchphraseRef.current) catchphraseObserver.observe(catchphraseRef.current);

        const warningObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setWarningVisible(true);
            },
            { threshold: 0.1 }
        );
        if (warningRef.current) warningObserver.observe(warningRef.current);

        const spineObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setSpineCompareVisible(true);
            },
            { threshold: 0.2 }
        );
        if (spineCompareRef.current) spineObserver.observe(spineCompareRef.current);

        const benefitsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setBenefitsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (benefitsRef.current) benefitsObserver.observe(benefitsRef.current);

        const eduObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setEduVisible(true);
            },
            { threshold: 0.15, rootMargin: '0px 0px -20px 0px' }
        );
        if (eduRef.current) eduObserver.observe(eduRef.current);

        const hookObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setHookVisible(true);
            },
            { threshold: 0.1 }
        );
        if (hookRef.current) hookObserver.observe(hookRef.current);

        const leeCareerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setLeeCareerVisible(true);
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );
        if (leeCareerRef.current) leeCareerObserver.observe(leeCareerRef.current);

        const kimCareerObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setKimCareerVisible(true);
            },
            { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
        );
        if (kimCareerRef.current) kimCareerObserver.observe(kimCareerRef.current);

        const qaObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setQaVisible(true);
            },
            { threshold: 0.1 }
        );
        if (qaRef.current) qaObserver.observe(qaRef.current);

        const reviewObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setReviewVisible(true);
            },
            { threshold: 0.15 }
        );
        if (reviewRef.current) reviewObserver.observe(reviewRef.current);

        const reasonsObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setReasonsVisible(true);
                    setCountStarted(true);
                }
            },
            { threshold: 0.1 }
        );
        if (reasonsRef.current) reasonsObserver.observe(reasonsRef.current);

        return () => {
            clearInterval(imageInterval);
            clearInterval(bookInterval);
            window.removeEventListener('scroll', handleScroll);
            ubeObserver.disconnect();
            titleObserver.disconnect();
            catchphraseObserver.disconnect();
            warningObserver.disconnect();
            spineObserver.disconnect();
            benefitsObserver.disconnect();
            eduObserver.disconnect();
            hookObserver.disconnect();
            leeCareerObserver.disconnect();
            kimCareerObserver.disconnect();
            qaObserver.disconnect();
            reviewObserver.disconnect();
            reasonsObserver.disconnect();
        };
    }, []);

    // 상담 신청 제출 핸들러
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !phone) {
            alert('성함과 연락처를 입력해주세요.');
            return;
        }

        if (!memo) {
            alert('증상 부위를 선택해주세요.');
            return;
        }

        if (!agreedPrivacy || !agreedCollection) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        if (isSubmitting) return;
        setIsSubmitting(true);

        // 1. Supabase(DB) 저장
        const { error: dbError } = await supabase
            .from('consultations')
            .insert([{ patient_name: name, phone, memo }]);

        if (dbError) {
            console.error('DB 저장 에러:', dbError);
            alert('일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
            // 2. 슬랙 알림 전송 (API Route 호출)
            try {
                const slackRes = await fetch('/api/slack', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, phone, memo }),
                });

                if (!slackRes.ok) {
                    console.error('슬랙 알림 전송 실패:', await slackRes.text());
                }
            } catch (slackError) {
                console.error('슬랙 알림 에러:', slackError);
            }

            alert('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
            // 전송 성공 후 입력창 및 팝업 닫기
            setName('');
            setPhone('');
            setMemo('');
            setAgreedPrivacy(true);
            setAgreedCollection(true);
            setIsPopupOpen(false);
        }
        setIsSubmitting(false);
    };

    return (
        <div className="relative min-h-screen bg-gray-900 font-sans flex justify-center">
            {/* \ud398\uc774\uc9c0 \ub85c\ub529 \ud504\ub85c\uadf8\ub808\uc2a4 \ubc14 */}
            <div className={`fixed top-0 left-0 h-[3px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 z-[100] transition-all duration-1000 ease-out ${pageLoaded ? 'w-full opacity-0' : 'w-[70%] opacity-100'}`}></div>

            <div className="w-full max-w-[640px] bg-white relative pb-32 shadow-2xl overflow-x-hidden min-h-screen">

                {/* --- [최상단] 히어로 훅(Hook) 섹션 --- */}
                <section ref={hookRef} className={`w-full bg-[#0f172a] pt-14 pb-20 px-6 relative z-20 overflow-hidden transition-all duration-[1200ms] ease-out transform ${hookVisible ? 'opacity-100' : 'opacity-0'}`}>
                    {/* 배경 효과 (더 은은하고 고급스럽게) */}
                    <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-gray-900 via-transparent to-transparent z-0"></div>

                    <div className="max-w-[500px] mx-auto relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 text-left">
                                <div className="inline-block bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-4">
                                    <span className="text-blue-400 text-[11px] font-bold tracking-[0.15em] uppercase">Yonsei Cheok</span>
                                </div>
                                <h2 className="text-white text-[23px] md:text-[27px] font-extrabold leading-[1.35] mb-5 break-keep tracking-[-0.02em]">
                                    <span className="text-yellow-400 block mb-1.5 hover:scale-[1.02] transition-transform origin-left">&apos;의사들이 수술법을 배우러 오는 곳&apos;</span>
                                    당신의 척추는 누구에게 맡기시겠습니까?
                                </h2>
                                <p className="text-gray-300 text-[16px] md:text-[18px] leading-[1.6] font-medium break-keep opacity-90">
                                    같은 양방향 척추내시경이라도 결과가 다른 이유,<br />
                                    바로 <span className="text-blue-400 font-extrabold underline decoration-2 underline-offset-8 decoration-blue-500/50">&apos;의사를 가르치는&apos; 숙련도의 차이</span>입니다.
                                </p>
                            </div>
                            <div className="w-[110px] md:w-[140px] shrink-0 animate-float relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
                                <Image src="/images/biportal-3d.png" alt="내시경 수술 이미지" width={200} height={200} className="object-contain relative z-10 drop-shadow-[0_10px_30px_rgba(59,130,246,0.3)]" />
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
                        `}} />
                </section>

                {/* --- 첫 번째 섹션: 메인 히어로 (배경 자동 전환 - Ken Burns 효과) --- */}
                <div className="relative w-full h-[100dvh] bg-gray-900 overflow-hidden font-sans">
                    {/* Ken Burns 애니메이션 스타일 */}
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @keyframes kenburns-0 {
                            0% { transform: scale(1) translate(0, 0); }
                            100% { transform: scale(1.15) translate(-1%, -1%); }
                        }
                        @keyframes kenburns-1 {
                            0% { transform: scale(1) translate(0, 0); }
                            100% { transform: scale(1.18) translate(1%, -0.5%); }
                        }
                        @keyframes kenburns-2 {
                            0% { transform: scale(1.05) translate(0, 0); }
                            100% { transform: scale(1.2) translate(-0.5%, 1%); }
                        }
                        @keyframes kenburns-3 {
                            0% { transform: scale(1) translate(0, 0); }
                            100% { transform: scale(1.15) translate(1%, 0.5%); }
                        }
                        .hero-slide-active .hero-bg { animation-play-state: running; }
                        .hero-slide-inactive .hero-bg { animation-play-state: paused; }
                    `}} />

                    {['/images/doctor.jpg', '/images/doctor2.jpg', '/images/hospital1.png', '/images/hospital2.jpg'].map((src, idx) => (
                        <div
                            key={src}
                            className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${currentImageIndex === idx ? 'opacity-100 hero-slide-active' : 'opacity-0 hero-slide-inactive'}`}
                            style={{ transform: `translateY(${parallaxOffset}px)` }}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center hero-bg"
                                style={{
                                    backgroundImage: `url('${src}')`,
                                    animation: `kenburns-${idx} 8s ease-in-out infinite alternate`,
                                    willChange: 'transform',
                                }}
                            />
                        </div>
                    ))}
                    <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-20">
                        <div className="absolute top-12 left-0 w-full flex justify-center">
                            <Image src="/images/logo-white.png" alt="연세척병원 로고" width={250} height={96} className="h-24 object-contain w-auto drop-shadow-md" />
                        </div>

                        <div className={`text-left mb-6 transition-all duration-1000 ease-out transform delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <p className="text-blue-400 font-extrabold text-[15px] mb-2 drop-shadow-md font-pretendard tracking-[-0.01em]">The Global Standard in UBE</p>
                            <h1 className="text-white text-[26.5px] font-extrabold leading-snug drop-shadow-lg font-pretendard tracking-[-0.01em] whitespace-nowrap mb-8">
                                해외에서 인정받는<br />양방향 척추내시경 연세척병원
                            </h1>
                        </div>

                        <div className="flex flex-col gap-3 relative z-20 pointer-events-auto">
                            <Link href="https://m.booking.naver.com/booking/13/bizes/666179?theme=place&entry=pll&lang=ko&area=pll" target="_blank" className="w-full bg-[#00c73c] hover:bg-[#00ab33] text-white text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer relative z-30">
                                <span className="font-extrabold text-[20px]">N</span>
                                네이버 예약
                            </Link>
                            <Link href="https://m.ys-cheok.com/001/004_4.php#doctorProfile" target="_blank" className="w-full bg-[#EAEAEA] hover:bg-gray-200 text-[#0d6efd] text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors cursor-pointer relative z-30">
                                의료진 바로보기
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- 척추 수술 위험 신호 경고 섹션 --- */}
                <section ref={warningRef} className="w-full bg-[#1b2330] pt-16 pb-16 px-5 flex flex-col items-center justify-center relative z-10 overflow-hidden text-white">
                    {/* 상단 메인 카피 & 서브 카피 */}
                    <div className={`text-center transition-all duration-1000 ease-out transform ${warningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center justify-center bg-red-600/20 border border-red-500/30 px-4 py-1.5 rounded-full mb-5">
                            <span className="text-red-400 font-bold text-[14px] tracking-tight">🚨 골든타임 경고</span>
                        </div>
                        <div ref={warningTextRef} className="relative text-[25px] md:text-[28px] font-extrabold leading-[1.35] tracking-[-0.02em] mb-4 break-keep text-left md:text-center w-full max-w-[400px] md:max-w-none mx-auto">
                            <h2 className="flex flex-col items-start md:items-center">
                                {/* 첫 번째 줄 (0~50% 구간 먼저 채워짐) */}
                                <span className="relative inline-block">
                                    <span className="text-white/20">이런 증상이 있다면,</span>
                                    <span 
                                        className="absolute top-0 left-0 w-full h-full text-white"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.min(100, warningTextProgress * 2)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.min(100, warningTextProgress * 2)}% 0 0)`
                                        }}
                                    >
                                        이런 증상이 있다면,
                                    </span>
                                </span>
                                
                                {/* 두 번째 줄 (50~100% 구간 나중에 채워짐) */}
                                <span className="relative inline-block mt-0.5 md:mt-1">
                                    <span className="text-red-500/30">당장 척추 전문의를 만나야 합니다.</span>
                                    <span 
                                        className="absolute top-0 left-0 w-full h-full text-red-500"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.max(0, (warningTextProgress - 50) * 2)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, (warningTextProgress - 50) * 2)}% 0 0)`
                                        }}
                                    >
                                        당장 척추 전문의를 만나야 합니다.
                                    </span>
                                </span>
                            </h2>
                        </div>
                        <p className="text-[16px] md:text-[17px] text-gray-300 font-medium leading-[1.6] break-keep max-w-[500px] mx-auto opacity-90">
                            단순한 근육통이 아닙니다. 신경 손상이 진행되고 있다는 우리 몸의 긴급 구조 요청입니다. 골든타임을 놓치지 마세요.
                        </p>
                    </div>

                    {/* 위험 신호 카드 그리드 */}
                    <div className="w-full max-w-[800px] mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* 경추(목) 위험 신호 */}
                        <div className={`bg-[#232d3e] border border-[#2a374c] rounded-2xl p-5 md:p-6 shadow-lg transition-all duration-1000 delay-200 ease-out transform ${warningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#324057]">
                                <div className="w-[38px] h-[38px] rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                    <span className="text-[20px]">⚠️</span>
                                </div>
                                <h3 className="text-[17px] md:text-[18px] font-bold text-white tracking-tight leading-[1.3]">경추(목) 위험 신호:<br/><span className="text-red-400 text-[15px] md:text-[16px]">상지 마비 및 신경 손상</span></h3>
                            </div>
                            <ul className="space-y-3.5">
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">근력 저하:</span> 젓가락질이 갑자기 서툴러지거나, 셔츠 단추를 채우기 힘들다.</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">물건 놓침:</span> 손에 쥐는 힘(악력)이 빠져 컵이나 물건을 자주 떨어뜨린다.</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">극심한 방사통:</span> 목보다 팔이나 손가락이 끊어질 듯이 아프고 저려 밤에 잠을 이룰 수 없다.</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">보행 장애:</span> 걸을 때 다리에 힘이 풀려 휘청거리거나, 구름 위를 걷는 듯한 감각 이상이 있다.</p>
                                </li>
                            </ul>
                        </div>

                        {/* 요추(허리) 위험 신호 */}
                         <div className={`bg-[#232d3e] border border-[#2a374c] rounded-2xl p-5 md:p-6 shadow-lg transition-all duration-1000 delay-300 ease-out transform ${warningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#324057]">
                                <div className="w-[38px] h-[38px] rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
                                    <span className="text-[20px]">⚠️</span>
                                </div>
                                <h3 className="text-[17px] md:text-[18px] font-bold text-white tracking-tight leading-[1.3]">요추(허리) 위험 신호:<br/><span className="text-red-400 text-[15px] md:text-[16px]">하지 마비 및 마미총 증후군</span></h3>
                            </div>
                            <ul className="space-y-3.5">
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">하체 마비 및 감각 소실:</span> 발목이나 발가락을 위로 들어 올리는 힘이 빠져 걷다가 자꾸 발이 걸려 넘어진다 (풋드랍 증상).</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">대소변 장애:</span> 소변이나 대변을 보는 감각이 무뎌지거나, 본인의 의지와 상관없이 실수를 한 적이 있다. <span className="text-red-400 text-[13px] block mt-0.5 font-medium">(※ 가장 응급한 수술이 필요한 마미총 증후군 증상)</span></p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">보존적 치료 무반응:</span> 3개월 이상 주사, 약물, 물리치료를 꾸준히 받았음에도 통증이 전혀 줄어들지 않고 악화된다.</p>
                                </li>
                                <li className="flex gap-2.5 items-start">
                                    <div className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                    <p className="text-[15px] text-gray-300 leading-[1.5] break-keep"><span className="font-bold text-white">극심한 파행:</span> 5분, 10분만 걸어도 터질 듯한 다리 통증 때문에 쪼그려 앉아 쉬어야만 한다.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 중간 브릿지 카피 (신뢰감 부여 및 행동 촉구) */}
                    <div className={`w-full max-w-[600px] mt-10 bg-gradient-to-r from-[#294f7e]/60 via-[#3b609c]/60 to-[#294f7e]/60 p-5 md:p-6 rounded-2xl border border-blue-400/30 text-center transition-all duration-1000 delay-400 ease-out transform ${warningVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <p className="text-[15px] md:text-[16px] leading-[1.65] text-white break-keep opacity-95">
                            신경은 한 번 손상되면 회복이 어렵습니다.<br/>
                            연세척병원은 무조건적인 수술을 권하지 않습니다.<br/>
                            하지만 <span className="text-yellow-300 font-extrabold">&apos;반드시 수술이 필요한 순간&apos;</span>에는 숙련된 의료진이<br className="hidden sm:block"/>
                            가장 안전하고 확실한 길을 제시합니다.
                        </p>
                    </div>
                </section>

                {/* --- 최소침습 양방향 척추내시경 섹션 --- */}
                <section className="w-full bg-white pt-16 pb-10 px-5 flex flex-col items-center justify-center text-center relative z-10 overflow-hidden">
                    <div ref={catchphraseRef} className={`font-pretendard font-extrabold text-[#294f7e] flex flex-col items-center gap-1 transition-opacity duration-1000 ease-in relative z-20 ${catchphraseVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <p className="text-[25px] tracking-tight">
                            <span style={{ WebkitTextEmphasis: 'filled dot #294f7e', textEmphasis: 'filled dot #294f7e', textEmphasisPosition: 'over right', WebkitTextEmphasisPosition: 'over right' }}>최소침습</span>으로 안전하게
                        </p>
                        <p className="text-[27px] tracking-tight">최대의 효과!</p>
                    </div>

                    {/* 배경 의사 사진과 아래쪽 그라데이션 페이드아웃 효과 */}
                    <div className="relative w-[calc(100%+40px)] -ml-[20px] -mr-[20px] h-[240px] md:h-[300px] mt-4 mb-[-60px] md:mb-[-80px] z-10 pointer-events-none transition-all duration-1000 ease-out transform delay-200">
                        <Image
                            src="/images/doctors.jpg"
                            alt="연세척병원 의료진"
                            fill
                            className="object-cover object-top opacity-90"
                        />
                        {/* 흰색으로 서서히 자연스럽게 녹아드는 그라데이션 */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white"></div>
                    </div>

                    <div ref={mainTitleRef} className="mt-4 font-수퍼사이즈 flex flex-col items-center justify-center w-full relative z-20 leading-[1.2] tracking-tight transform -skew-x-[4deg] overflow-hidden">
                        <div className="flex flex-col items-center w-full" style={{ filter: 'drop-shadow(2px 2px 0px #9cafc3)' }}>
                            <div className={`text-[60px] bg-clip-text text-transparent bg-gradient-to-b from-[#294f7e] to-[#1b2330] text-center pt-2 px-4 pb-2 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform ${mainTitleVisible ? 'translate-x-0 opacity-100' : '-translate-x-[50vw] opacity-0'}`}>
                                양방향
                            </div>
                            <div className={`text-[60px] bg-clip-text text-transparent bg-gradient-to-b from-[#294f7e] to-[#1b2330] mt-0 text-center whitespace-nowrap px-4 pb-6 transition-all duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] transform delay-100 ${mainTitleVisible ? 'translate-x-0 opacity-100' : 'translate-x-[50vw] opacity-0'}`}>
                                척추내시경
                            </div>
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="w-full max-w-[420px] md:max-w-[480px] mt-2 mb-6 px-4">
                        <hr className="border-[#a6b5c9] border-t-[1px]" />
                    </div>

                    {/* --- UBE 상세 설명 --- */}
                    <div ref={ubeRef} className="w-full max-w-[800px] flex flex-col items-center overflow-hidden">
                        {/* 헤더 타이틀 블록 */}
                        <div className={`w-full max-w-[280px] md:max-w-[320px] bg-gradient-to-b from-[#3c5c89] to-[#354765] text-white px-2 py-2 flex items-center justify-center min-h-[40px] md:min-h-[46px] whitespace-nowrap overflow-hidden transition-all duration-1000 ease-out transform ${ubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <h3 className="font-pretendard font-bold text-[18px] sm:text-[20px] md:text-[22px] tracking-tight leading-none text-center">
                                양방향 척추내시경 (UBE)이란?
                            </h3>
                        </div>

                        {/* 본문 콘텐츠 블록 (세로 배치) */}
                        <div className={`flex flex-col items-center justify-center gap-6 w-full mt-6 px-4 transition-all duration-1000 delay-300 ease-out transform ${ubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* 이미지 */}
                            <div className="w-[200px] md:w-[280px] aspect-[4/3] relative shrink-0">
                                <Image
                                    src="/images/biportal-pcs.png"
                                    alt="양방향 척추내시경 시술 장면 설명"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            {/* 텍스트 */}
                            <div className="font-pretendard text-center flex flex-col space-y-4 shrink-0 max-w-[500px]">
                                <p className="text-[17px] md:text-[20px] font-semibold text-[#111111] tracking-tight md:tracking-tighter leading-[1.4] break-keep">
                                    두 개의 1cm 이하의 절개창을 이용하는<br />
                                    <span className="text-[#3b609c] font-bold">정밀 수술방법</span>으로 한쪽은 내시경,<br />
                                    다른 한쪽에는 수술기구를 삽입하여<br />
                                    감압하는 방법입니다.
                                </p>
                                <p className="text-[17px] md:text-[20px] font-semibold text-[#111111] tracking-tight md:tracking-tighter leading-[1.4] break-keep">
                                    기존의 신경 성형술 등의 시술로<br />
                                    불가능했던 <span className="text-[#3b609c] font-bold">근본적인 치료</span>가 가능합니다.
                                </p>
                            </div>
                        </div>

                        {/* 구분선 (전/후 비교 위쪽) */}
                        <div className={`w-full max-w-[420px] md:max-w-[480px] mt-12 mb-6 px-4 transition-all duration-1000 delay-400 ease-out transform ${ubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <hr className="border-[#a6b5c9] border-t-[1px]" />
                        </div>

                        {/* --- 양방향 척추내시경 전/후 비교 (인터랙티브 슬라이더) --- */}
                        <div ref={spineCompareRef} className={`mb-8 flex flex-col items-center justify-center w-full transition-all duration-1000 delay-500 ease-out transform ${ubeVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            {/* 헤더 타이틀 블록 */}
                            <div className="w-full max-w-[280px] md:max-w-[320px] bg-[#535c75] text-[#ffeb3b] px-2 py-2 flex items-center justify-center min-h-[40px] md:min-h-[46px] whitespace-nowrap overflow-hidden">
                                <h3 className="font-pretendard font-bold text-[18px] sm:text-[20px] md:text-[22px] tracking-tight leading-none text-center">
                                    양방향 척추내시경 전·후
                                </h3>
                            </div>

                            {/* 인터랙티브 비교 슬라이더 */}
                            <div
                                ref={sliderRef}
                                className="relative w-full max-w-[400px] aspect-[4/5] mt-6 mx-auto rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-col-resize select-none"
                                onMouseMove={(e) => {
                                    if (e.buttons !== 1) return;
                                    const rect = sliderRef.current?.getBoundingClientRect();
                                    if (!rect) return;
                                    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                                    setSliderPos((x / rect.width) * 100);
                                }}
                                onTouchMove={(e) => {
                                    const rect = sliderRef.current?.getBoundingClientRect();
                                    if (!rect) return;
                                    const touch = e.touches[0];
                                    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                                    setSliderPos((x / rect.width) * 100);
                                }}
                            >
                                {/* 후 (배경) */}
                                <Image src="/images/spine2.png" alt="내시경 감압술 후" fill className="object-contain md:object-cover" style={{ objectPosition: 'center 15%' }} />
                                <div 
                                    className="absolute top-3 right-3 bg-[#00c73c] text-white text-[13px] font-bold px-3 py-1 rounded-full z-20 shadow transition-opacity duration-300"
                                    style={{ opacity: sliderPos > 97 ? 0 : 1 }}
                                >
                                    수술 후
                                </div>

                                {/* 전 (오버레이 - clip) */}
                                <div className="absolute inset-0 z-10" style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}>
                                    <Image src="/images/spine1.png" alt="내시경 감압술 전" fill className="object-contain md:object-cover" />
                                    <div 
                                        className="absolute top-3 left-3 bg-[#dc2626] text-white text-[13px] font-bold px-3 py-1 rounded-full shadow transition-opacity duration-300"
                                        style={{ opacity: sliderPos < 3 ? 0 : 1 }}
                                    >
                                        수술 전
                                    </div>
                                </div>

                                {/* 슬라이더 핸들 (가운데 위치한 흰색 선) */}
                                <div className="absolute top-0 bottom-0 z-20 flex items-center pointer-events-none" style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}>
                                    <div className="w-[3px] h-full bg-white shadow-lg"></div>
                                </div>
                            </div>
                            <p className="mt-4 text-[14px] text-gray-500 font-medium text-center">← 좌우로 드래그하여 비교해보세요 →</p>
                        </div>

                        {/* --- 양방향 척추내시경 장점 리스트 --- */}
                        <div ref={benefitsRef} className="flex flex-col gap-4 md:gap-5 w-full max-w-[420px] md:max-w-[480px] px-4 font-pretendard mt-1 md:mt-2 pt-2 pb-10">
                            {[
                                { black1: "넓은 시야 확보로 ", blue: "정밀 수술 가능", black2: "" },
                                { black1: "조직의 ", blue: "손상이 적고", black2: ", 통증 및 부작용이 매우 적음" },
                                { black1: "", blue: "치료의 범위가 광범위함", black2: "", subText: "(경추, 흉추, 요추, 유합술 및 재수술도 가능)" },
                                { black1: "절개 수술과 같이 높은 성공률", blue: "", black2: "" },
                                { black1: "", blue: "짧은 수술시간 및 빠른 회복", black2: "" },
                                { black1: "", blue: "부분마취", black2: "로 수술 가능" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-start gap-3 transition-all duration-1000 ease-out transform ${benefitsVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}`}
                                    style={{ transitionDelay: `${index * 150 + 300}ms` }}
                                >
                                    {/* 체크 기호 (애니메이션) */}
                                    <div className="shrink-0 w-[22px] h-[22px] md:w-[26px] md:h-[26px] mt-[3px] md:mt-[4px] rounded-full border-[2.5px] border-[#3b609c] flex items-center justify-center bg-white shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px] md:w-[15px] md:h-[15px] text-[#3b609c]">
                                            <polyline points="20 6 9 17 4 12" className={`check-draw ${benefitsVisible ? 'animate' : ''}`} style={{ animationDelay: `${index * 150 + 500}ms` }}></polyline>
                                        </svg>
                                    </div>

                                    {/* 텍스트 내용 */}
                                    <div className="flex flex-col pt-[1px] md:pt-[2px] break-keep text-left w-full">
                                        <p className="text-[20px] md:text-[24px] lg:text-[26px] leading-[1.25] md:leading-[1.3] tracking-tight">
                                            {item.black1 && <span className="font-bold text-[#111111]">{item.black1}</span>}
                                            {item.blue && <span className="font-extrabold text-[#3b609c]">{item.blue}</span>}
                                            {item.black2 && <span className="font-bold text-[#111111]">{item.black2}</span>}
                                        </p>
                                        {item.subText && (
                                            <p className="text-[17px] md:text-[20px] font-bold text-[#555555] mt-1.5 tracking-tight leading-[1.3]">
                                                {item.subText}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 새 섹션: 의사를 가르치는 병원 (신규 추가) --- */}
                <section ref={eduRef} className="w-full bg-[#fcfdfe] py-16 px-5 relative z-10 border-t border-gray-100 overflow-hidden">
                    <div className={`max-w-[800px] mx-auto transition-all duration-1000 ease-out transform ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                        {/* 타이틀 영역 (스크롤 연동 애니메이션 - 모바일 최적화 3줄 구성) */}
                        <div className="text-center mb-12">
                            <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-[#111111] mb-6 break-keep flex flex-col items-center gap-1 md:gap-2">
                                {/* 첫 번째 줄 (0~33% 구간) */}
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10 whitespace-nowrap uppercase">신경외과 전문의들이</span>
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.min(100, eduTextProgress * 3.03)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.min(100, eduTextProgress * 3.03)}% 0 0)`
                                        }}
                                    >
                                        신경외과 전문의들이
                                    </span>
                                </div>

                                {/* 두 번째 줄 (33~66% 구간) */}
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10 whitespace-nowrap">찾아와 배우는 병원,</span>
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (eduTextProgress - 33.3) * 3.03))}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (eduTextProgress - 33.3) * 3.03))}% 0 0)`
                                        }}
                                    >
                                        찾아와 배우는 병원,
                                    </span>
                                </div>
                                
                                {/* 세 번째 줄 (66~100% 구간) */}
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10 whitespace-nowrap">
                                        <span className="text-blue-600 opacity-20">연세척병원</span>입니다.
                                    </span>
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (eduTextProgress - 66.6) * 3.03))}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (eduTextProgress - 66.6) * 3.03))}% 0 0)`
                                        }}
                                    >
                                        <span className="text-blue-600">연세척병원</span>입니다.
                                    </span>
                                </div>
                            </h2>
                            <div className="space-y-4 text-[16px] md:text-[18px] font-medium leading-[1.7] tracking-[-0.01em] text-gray-600 break-keep">
                                <p>
                                    연세척병원 이남, 김동한 병원장은 수많은 고난도 수술을 성공시키며 쌓아온 독보적인 임상 경험을 병원 안에만 머물게 하지 않습니다.
                                </p>
                                <p>
                                    정기적인 심포지엄과 라이브 서저리(Live Surgery) 시연을 통해 <span className="font-bold text-gray-900">국내외 신경외과 전문의들에게 최신 척추 수술 기법과 노하우를 직접 전수하고 있습니다.</span>
                                </p>
                                <p>
                                    &apos;의사를 가르치는 의사&apos;라는 타이틀은 단순히 실력이 뛰어나다는 것을 넘어, <span className="font-bold text-gray-900">가장 안전하고 검증된 의술만을 환자에게 제공하겠다는</span> 연세척병원의 굳은 약속입니다.
                                </p>
                            </div>
                        </div>

                        {/* 유튜브 그리드 영역 (2x2) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-12">
                            {[
                                { id: 'I0GZG8ro6F4', desc: '삿포로 Teine Keijinkai 병원 신경외과 의사 타카시' },
                                { id: 'TV52KzCMK8Q', desc: '브라질 신경외과 전문의 Marcel' },
                                { id: 'p_Ocvr3WzNU', desc: '인하대 병원 신경외과 전문의 김동휘' },
                                { id: 'KcRLnNNvYn4', desc: '이남 병원장 양방향 추간공 감압술 라이브 서저리' }
                            ].map((video, idx) => (
                                <div
                                    key={idx}
                                    className={`flex flex-col gap-3 group transition-all duration-[1000ms] ease-out transform ${eduVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                                    style={{ transitionDelay: `${idx * 150 + 500}ms` }}
                                >
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100 border border-gray-200">
                                        {playingVideoId === video.id ? (
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                                                title={`교육 영상 ${idx + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        ) : (
                                            <button onClick={() => setPlayingVideoId(video.id)} className="w-full h-full relative group cursor-pointer">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                                                    alt={`교육 영상 ${idx + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="w-[60px] h-[42px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6 ml-0.5">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-[14px] md:text-[15px] font-bold text-gray-800 text-center px-2 leading-[1.4] break-keep">
                                        {video.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- 두 번째 섹션: 환자 후기 영상 --- */}
                <section ref={reviewRef} className="w-full bg-white pt-12 pb-16 md:pt-14 px-5 relative z-10">
                    <div className={`flex flex-col gap-6 text-center font-sans transition-all duration-1000 ease-out transform ${reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            실제 환자분들이<br />증명하는 결과
                        </h2>
                        <p className="text-base font-semibold leading-[1.4] tracking-[-0.02em] text-[#727582]">
                            왜 연세척병원을 선택하고<br />주변에 자신있게 추천하는지 직접 확인해보세요
                        </p>
                    </div>
                    <div className={`mt-8 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 relative aspect-video transition-all duration-1000 delay-300 ease-out transform ${reviewVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        {playingVideoId === '50dNBoWAS4Y' ? (
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src="https://www.youtube.com/embed/50dNBoWAS4Y?autoplay=1"
                                title="유튜브 환자 후기 영상"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <button
                                onClick={() => setPlayingVideoId('50dNBoWAS4Y')}
                                className="w-full h-full relative group cursor-pointer"
                            >
                                <img
                                    src="https://img.youtube.com/vi/50dNBoWAS4Y/maxresdefault.jpg"
                                    alt="유튜브 환자 후기 영상 썸네일"
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

                {/* --- 연세척TV 유튜브 섹션 --- */}
                <section className="w-full bg-[#f8f9fa] pt-12 pb-16 px-5 relative z-10">
                    <div className="flex flex-col items-center text-center font-sans">
                        {/* 버튼 태그 */}
                        <Link
                            href="https://www.youtube.com/@%EC%97%B0%EC%84%B8%EC%B2%99TV"
                            target="_blank"
                            className="inline-flex items-center gap-1.5 bg-white text-[#3b609c] font-bold text-[14px] px-5 py-2 rounded-full border border-[#d0daf0] mb-5 hover:bg-[#e0eaff] transition-colors shadow-sm"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000" className="w-4 h-4">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                            연세척TV
                        </Link>

                        {/* 제목 */}
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black mb-3">
                            다양한 치료에 대한 설명을<br />영상으로 확인하세요
                        </h2>

                        {/* 부제 */}
                        <p className="text-base font-semibold leading-[1.4] tracking-[-0.02em] text-[#727582] mb-8">
                            실제 치료사례와 치료후기
                        </p>
                    </div>

                    {/* 영상 목록 - 가로 스와이프 캐러셀 */}
                    <div ref={ytCarouselRef} onScroll={handleYtScroll} className="w-full overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            .yt-carousel::-webkit-scrollbar { display: none; }
                        ` }} />
                        <div className="flex gap-0 w-max yt-carousel">
                            {[
                                'RPmS13g9vhE',
                                'eOKQ8lFaTJU',
                                'smmrOQcmhwU',
                                'VeYXZOdyirY',
                                'abw63xOlMak',
                                '-cyQjALtBTM',
                                'FrSPtpp4-20',
                            ].map((videoId, index) => (
                                <div key={videoId} className="w-[85dvw] max-w-[400px] px-[7.5px] shrink-0 snap-center">
                                    <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                                        {playingVideoId === videoId ? (
                                            <iframe
                                                className="absolute top-0 left-0 w-full h-full"
                                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                                                title={`연세척TV 영상 ${index + 1}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                            />
                                        ) : (
                                            <button onClick={() => setPlayingVideoId(videoId)} className="w-full h-full relative group cursor-pointer">
                                                <img
                                                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                                    alt={`연세척TV 영상 ${index + 1}`}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                    <div className="w-[68px] h-[48px] bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-0.5">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 스와이프 인디케이터 */}
                    <div className="flex justify-center gap-1.5 mt-4">
                        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === activeYtIndex ? 'bg-[#3b609c]' : 'bg-gray-300'}`} />
                        ))}
                    </div>
                </section>

                {/* --- 세 번째 섹션: 연세척병원이 특별한 이유 --- */}
                <section ref={reasonsRef} className="w-full bg-[#f8f9fa] py-16 px-5 relative z-10">
                    <div className={`flex flex-col gap-4 text-center font-pretendard mb-10 transition-all duration-1000 ease-out transform ${reasonsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                        <div className="flex justify-center mb-1">
                            <Image src="/images/logo.png" alt="연세척병원 로고" width={200} height={56} className="h-14 object-contain w-auto opacity-80" />
                        </div>
                        <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            연세척병원이<br />특별한 이유
                        </h2>
                    </div>

                    <div className="bg-white rounded-[32px] pt-10 pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 card-hover-lift">
                        <div className="text-center mb-8 px-6">
                            <span className="text-blue-600 text-4xl font-extrabold block mb-3 font-pretendard">1</span>
                            <h3 className="text-[22px] font-bold leading-[1.4] tracking-[-0.02em] text-black">
                                신경외과 의사를 가르치는<br />신경외과 전문의
                            </h3>
                            <p className="mt-4 text-[15.5px] md:text-[17px] text-gray-600 font-medium leading-[1.6] break-keep px-2">
                                미국, 홍콩, 브라질, 사우디 등 세계 <span className="inline-block min-w-[1.2em] text-center tabular-nums text-blue-600 font-extrabold text-[20px]">{countUpValues.countries}</span>개국에서 <span className="inline-block min-w-[1.2em] text-center tabular-nums text-blue-600 font-extrabold text-[20px]">{countUpValues.doctors}</span>여 명의 해외 척추 전문의들이 직접 찾아와 그 노하우를 배워갑니다.
                            </p>
                        </div>

                        {/* 가로 스크롤 슬라이더 (자동 롤링 애니메이션 추가) */}
                        <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes slide {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(calc(-240px * ${slideCount} - 16px * ${slideCount})); }
                                }
                                .animate-slide {
                                    animation: slide ${slideCount * 5}s linear infinite;
                                }
                            `}} />
                            <div className="flex gap-4 animate-slide shrink-0">
                                {/* 첫 번째 세트 */}
                                {Array.from({ length: slideCount }, (_, i) => i + 1).map((num) => (
                                    <div key={`set1-${num}`} className="w-[80vw] max-w-[280px] shrink-0 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
                                        <div className="w-full aspect-[4/5] relative">
                                            <Image src={`/images/slide${num}.jpg`} alt={`교육 및 세미나 모습 ${num}`} fill className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 animate-slide shrink-0 ml-4">
                                {/* 두 번째 세트 (무한 루프 끊김 방지용 복제본) */}
                                {Array.from({ length: slideCount }, (_, i) => i + 1).map((num) => (
                                    <div key={`set2-${num}`} className="w-[80vw] max-w-[280px] shrink-0 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
                                        <div className="w-full aspect-[4/5] relative">
                                            <Image src={`/images/slide${num}.jpg`} alt={`교육 및 세미나 모습 ${num}`} fill className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- 2번: 전 세계 척추내시경 전문의의 바이블 --- */}
                    <div className="bg-gradient-to-b from-[#1c2d49] to-[#121c30] rounded-[32px] mt-8 pt-8 pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden relative card-hover-lift">
                        <div className="text-center mb-0 px-6 relative z-30">
                            <span className="text-[#00c73c] text-4xl font-extrabold block mb-2 font-pretendard">2</span>
                            <h3 className="text-[20px] xs:text-[22px] md:text-[25px] font-bold leading-[1.4] tracking-[-0.03em] text-white break-keep">
                                전 세계 척추내시경 전문의 바이블,<br />연세척병원이 집필합니다.
                            </h3>
                        </div>

                        {/* 1. 이미지 및 애니메이션 컨테이너 (세로 쌓임) */}
                        <div className="relative w-full flex flex-col items-center justify-start pb-6 px-4 mt-8 md:mt-10">

                            {/* 책 이미지 스왑 영역 */}
                            <div className="relative w-full h-[320px] xs:h-[400px] md:h-[500px]">
                                {books.map((book, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 w-full h-full flex flex-col items-center justify-end transition-opacity duration-1000 ease-in-out ${currentBookIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'} pointer-events-none`}
                                    >
                                        <div className="relative w-[85%] md:w-[70%] max-w-[360px] h-full">
                                            <Image src={book.image} alt={book.label} fill className="object-contain object-bottom drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 책 텍스트 라벨 (가운데 정렬) */}
                            <div className="relative h-[30px] md:h-[40px] mt-4 mb-8 flex items-center justify-center w-full">
                                {books.map((book, idx) => (
                                    <p
                                        key={`label-${idx}`}
                                        className={`absolute font-pretendard font-extrabold text-[17px] md:text-[21px] text-white drop-shadow-md transition-opacity duration-1000 ease-in-out ${currentBookIndex === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'} whitespace-nowrap`}
                                    >
                                        {book.label}
                                    </p>
                                ))}
                            </div>

                            {/* 원장님 이미지 영역 (고정) */}
                            <div className="relative w-[100%] max-w-[500px] h-[320px] xs:h-[380px] md:h-[480px] flex justify-center items-end z-10 -mt-2 md:-mt-4">
                                {/* 이남 원장님 (왼쪽 반전) */}
                                <div className="absolute left-[-4%] md:left-[0%] bottom-0 w-[65%] h-[108%] z-10">
                                    <Image src="/images/lee.png" alt="이남 병원장" fill className="object-contain object-bottom drop-shadow-xl scale-x-[-1]" />
                                </div>
                                {/* 김동한 원장님 (오른쪽 크기 맞춤) */}
                                <div className="absolute right-[-4%] md:right-[-3%] bottom-0 w-[66%] h-[110%] z-20">
                                    <Image src="/images/kim.png" alt="김동한 병원장" fill className="object-contain object-bottom drop-shadow-xl" />
                                </div>
                            </div>

                            {/* 하단 선 및 원장님 라벨 텍스트 */}
                            <div className="relative w-[95%] md:w-[80%] max-w-[400px] mt-0 z-30 pointer-events-auto flex flex-col items-center">
                                <div className="w-full border-t-[2px] border-[#a0c5fe] pt-4 text-center bg-transparent mix-blend-normal">
                                    <p className="font-pretendard font-bold text-[19px] md:text-[23px] text-white leading-[1.35] break-keep drop-shadow-md shadow-black">
                                        이남, 김동한 병원장
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 하단 설명 텍스트 */}
                        <div className="px-6 mt-8 font-pretendard text-center text-[15px] md:text-[17px] text-[#e0e5ed] font-medium leading-[1.6] break-keep flex flex-col gap-4 relative z-30">
                            <p>
                                연세척병원 이남, 김동한 병원장이 세계적인 의학 전문 출판사 Springer에서 발행한 &apos;양방향 척추내시경 교과서&apos;의 시리즈에 공동 저자로 참여했습니다.
                            </p>
                            <p>
                                본 교과서는 전 세계 척추내시경 집도의들에게 바이블과 같은 역할을 하고 있으며, 이는 연세척병원 의료진의 세계적인 수준을 보여주는 뜻깊은 결과물입니다.
                            </p>
                        </div>
                    </div>

                    {/* --- 3번: 전국 신경외과 대상 학술 경연 --- */}
                    <div className="bg-white rounded-[32px] mt-8 pt-10 pb-12 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100 card-hover-lift">
                        <div className="text-center mb-8 px-6">
                            <span className="text-blue-600 text-4xl font-extrabold block mb-3 font-pretendard">3</span>
                            <h3 className="text-[22px] font-bold leading-[1.4] tracking-[-0.02em] text-black mb-4">
                                전국 신경외과 대상<br />학술 경연
                            </h3>
                            <p className="text-[15px] md:text-[17px] font-medium text-gray-600 leading-[1.6] break-keep">
                                남들이 학술강연을 들을 때,<br />연세척병원은 학술 심포지엄을 엽니다.<br />
                                <span className="font-bold text-gray-800 mt-2 block">실력의 차이가 결과의 차이를 만듭니다.</span>
                            </p>
                        </div>

                        {/* 가로 스크롤 슬라이더 (sympoCount 변수에 따라 자동 조절) */}
                        <div className="relative w-full overflow-hidden flex" style={{ maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)' }}>
                            <style dangerouslySetInnerHTML={{
                                __html: `
                                @keyframes slide-sympo {
                                    0% { transform: translateX(0); }
                                    100% { transform: translateX(calc(-240px * ${sympoCount} - 16px * ${sympoCount})); }
                                }
                                .animate-slide-sympo {
                                    animation: slide-sympo ${sympoCount * 4}s linear infinite;
                                }
                            `}} />
                            <div className="flex gap-4 animate-slide-sympo shrink-0">
                                {/* 첫 번째 세트 */}
                                {Array.from({ length: sympoCount }, (_, i) => i + 1).map((num) => (
                                    <div key={`sympo-set1-${num}`} className="w-[240px] shrink-0 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
                                        <div className="w-full aspect-[4/5] relative bg-gray-100">
                                            <Image src={`/images/sympo${num}.jpg`} alt={`학술 심포지엄 모습 ${num}`} fill className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 animate-slide-sympo shrink-0 ml-4">
                                {/* 두 번째 세트 (무한 루프 끊김 방지용 복제본) */}
                                {Array.from({ length: sympoCount }, (_, i) => i + 1).map((num) => (
                                    <div key={`sympo-set2-${num}`} className="w-[240px] shrink-0 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
                                        <div className="w-full aspect-[4/5] relative bg-gray-100">
                                            <Image src={`/images/sympo${num}.jpg`} alt={`학술 심포지엄 모습 ${num}`} fill className="absolute inset-0 w-full h-full object-cover" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 새 섹션: 이남 병원장 약력 --- */}
                <section ref={leeCareerRef} className="w-full bg-[#0f172a] pt-48 md:pt-72 pb-16 md:pb-24 px-6 relative z-10 overflow-hidden">
                    {/* 상단 그라데이션 전환 */}
                    <div className="absolute top-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-b from-white to-[#0f172a] z-0 pointer-events-none opacity-100"></div>
                    <div className={`max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-1000 ease-out transform ${leeCareerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                        {/* 이미지 영역 */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-[450px] aspect-[1/1.2] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="/images/lee sur.png"
                                    alt="이남 병원장"
                                    fill
                                    className={`object-cover object-top transition-transform duration-[5000ms] ease-out ${leeCareerVisible ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className={`text-white text-4xl font-normal font-cafe24 tracking-wide ${leeCareerVisible ? 'animate-write' : 'opacity-0'}`}>
                                        Lee Nam
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="w-full md:w-1/2 text-white">
                            <div className="mb-6 md:mb-10">
                                <h2 className="text-[34px] md:text-[40px] font-extrabold leading-tight tracking-tight mb-4 break-keep">
                                    이남 <span className="text-[20px] md:text-[24px] font-medium ml-1 opacity-70 tracking-normal">병원장</span>
                                </h2>
                                <div className="h-1.5 w-16 bg-blue-500 rounded-full mb-6"></div>
                                <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 md:mb-6 tracking-wider border border-blue-600/30 font-pretendard">경력사항</span>
                            </div>

                            <ul className="space-y-4 md:space-y-5">
                                {[
                                    "연세대학교 세브란스병원 신경외과 외래부교수",
                                    "양방향 척추내시경(UBE) 연구회 부회장",
                                    "대한최소침습척추학회(KOMISS) 재무위원",
                                    "부산-울산-경남 척추내시경 연구회 총괄이사",
                                    "미국 스탠포드(Stanford) 대학교 척추신경외과 연수",
                                    "미국 LA UCLA 대학병원 양방향 척추내시경 카데바시연 강연",
                                    "세계양방향척추내시경연구회(UBE) 학술대회 '최우수 강의상' 수상"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group">
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mt-[3px] group-hover:bg-blue-600/40 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                        </div>
                                        <span className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-gray-300 break-keep group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 새 섹션: 김동한 병원장 약력 --- */}
                <section ref={kimCareerRef} className="w-full bg-[#0f172a] pt-4 pb-16 md:pb-24 px-6 relative z-20 overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.4)]">
                    <div className={`max-w-[1000px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16 transition-all duration-1000 ease-out transform ${kimCareerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
                        {/* 이미지 영역 */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-[450px] aspect-[1/1.2] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                                <Image
                                    src="/images/kim sur2.jpg"
                                    alt="김동한 병원장"
                                    fill
                                    className={`object-cover object-top transition-transform duration-[5000ms] ease-out ${kimCareerVisible ? 'scale-110' : 'scale-100'}`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className={`text-white text-3xl font-normal font-cafe24 tracking-wide ${kimCareerVisible ? 'animate-write' : 'opacity-0'}`}>
                                        Kim Dong Han
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* 텍스트 영역 */}
                        <div className="w-full md:w-1/2 text-white">
                            <div className="mb-6 md:mb-10 text-left">
                                <h2 className="text-[34px] md:text-[40px] font-extrabold leading-tight tracking-tight mb-4 break-keep">
                                    김동한 <span className="text-[20px] md:text-[24px] font-medium ml-1 opacity-70 tracking-normal">병원장</span>
                                </h2>
                                <div className="h-1.5 w-16 bg-blue-500 rounded-full mb-6 ml-0"></div>
                                <span className="inline-block bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-sm font-bold mb-4 md:mb-6 tracking-wider border border-blue-600/30 font-pretendard">경력사항</span>
                            </div>

                            <ul className="space-y-4 md:space-y-5">
                                {[
                                    "경북대학교병원 신경외과 외래교수",
                                    "양방향 척추내시경(UBE) 연구회 학술위원",
                                    "대한최소침습척추학회(KOMISS) 학술위원",
                                    "부산-울산-경남 척추내시경 연구회 학술간사",
                                    "미국 Tampa general hospital 연수",
                                    "10th ASIA spine symposium 카데바시연 강연",
                                    "말레이시아 양방향 척추내시경 카데바시연 강연"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex gap-4 items-start group md:flex-row text-left">
                                        <div className="shrink-0 w-5 h-5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mt-[3px] group-hover:bg-blue-600/40 transition-colors">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                        </div>
                                        <span className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-gray-300 break-keep group-hover:text-white transition-colors">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* --- 핵심 Q&A 섹션 --- */}
                <section ref={qaRef} className="w-full bg-white pt-16 pb-16 px-5 relative z-10 flex flex-col items-center justify-center font-pretendard">
                    <div className={`flex flex-col gap-3 text-center mb-10 transition-all duration-1000 ease-out transform ${qaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            양방향 척추내시경(UBE)<br />
                            <span className="text-[#3b609c]">핵심 Q&A</span>
                        </h2>
                    </div>

                    <div className="w-full max-w-full flex flex-col gap-3">
                        {qaData.map((item, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-500 ease-out transform ${openQaIndex === index ? 'border-blue-300 shadow-md' : 'border-gray-200 shadow-sm'} ${qaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                                style={{ transitionDelay: qaVisible ? `${index * 100}ms` : '0ms' }}
                            >
                                <button
                                    onClick={() => setOpenQaIndex(openQaIndex === index ? null : index)}
                                    className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none"
                                >
                                    <div className="flex gap-3 items-start pr-4">
                                        <span className="text-[#3b609c] font-extrabold text-[18px] mt-[1px]">Q.</span>
                                        <span className={`font-bold text-[16px] md:text-[18px] leading-[1.4] break-keep transition-colors duration-300 ${openQaIndex === index ? 'text-[#3b609c]' : 'text-gray-800'}`}>
                                            {item.q}
                                        </span>
                                    </div>
                                    <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300 ${openQaIndex === index ? 'border-[#3b609c] bg-[#3b609c] text-white' : 'border-gray-300 text-gray-400'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform duration-300 ${openQaIndex === index ? 'rotate-180' : 'rotate-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div
                                    className={`px-5 overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${openQaIndex === index ? 'max-h-[300px] py-4 border-t border-gray-100 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
                                >
                                    <div className="flex gap-3 items-start">
                                        <span className="text-gray-900 font-extrabold text-[18px] mt-[1px]">A.</span>
                                        <p className="text-[15px] md:text-[16px] text-gray-700 font-medium leading-[1.6] break-keep">
                                            {item.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- 오시는 길 섹션 --- */}
                <section className="w-full bg-[#f8f9fa] pt-16 pb-16 px-5 relative z-10 flex flex-col items-center justify-center font-pretendard">
                    <div className="flex flex-col gap-3 text-center mb-10 w-full">
                        <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            오시는 길
                        </h2>
                    </div>

                    <div className="w-full max-w-full flex flex-col gap-8">

                        {/* 정보 영역 */}
                        <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-gray-100">
                            <div className="flex flex-col gap-6">
                                {/* 주소 */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#3b609c]/10 flex items-center justify-center text-[#3b609c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#3b609c] mb-1">주소</span>
                                        <p className="text-[17px] font-bold text-gray-900 break-keep">
                                            부산광역시 부산진구 가야대로 715 (당감동)
                                        </p>
                                    </div>
                                </div>

                                {/* 구분선 */}
                                <div className="h-[1px] bg-gray-100 w-full"></div>

                                {/* 대표번호 */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#3b609c]/10 flex items-center justify-center text-[#3b609c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#3b609c] mb-1">대표번호</span>
                                        <Link href="tel:051-935-1004" className="text-[22px] font-extrabold text-gray-900 hover:text-[#3b609c] transition-colors">
                                            051-935-1004
                                        </Link>
                                    </div>
                                </div>

                                {/* 구분선 */}
                                <div className="h-[1px] bg-gray-100 w-full"></div>

                                {/* 진료시간 */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#3b609c]/10 flex items-center justify-center text-[#3b609c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#3b609c] mb-2">진료시간</span>
                                        <div className="text-[15px] font-medium text-gray-700 space-y-1">
                                            <p><span className="font-bold text-gray-900 inline-block w-[72px]">평일</span>09:00 ~ 17:30</p>
                                            <p><span className="font-bold text-gray-900 inline-block w-[72px]">토요일</span>09:00 ~ 13:00</p>
                                            <p><span className="font-bold text-red-500 inline-block w-[72px]">일·공휴일</span>휴진</p>
                                        </div>
                                    </div>
                                </div>

                                {/* 구분선 */}
                                <div className="h-[1px] bg-gray-100 w-full"></div>

                                {/* 교통편 */}
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-[#3b609c]/10 flex items-center justify-center text-[#3b609c]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H21M3.375 14.25h17.25M3.375 14.25V3.375c0-.621.504-1.125 1.125-1.125h9.75c.621 0 1.125.504 1.125 1.125v3.026M2.25 14.25h1.5M21 12V6.375c0-.621-.504-1.125-1.125-1.125h-2.25" />
                                        </svg>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-[#3b609c] mb-2">교통편 안내</span>
                                        <div className="text-[15px] font-medium text-gray-700 space-y-1.5">
                                            <p className="flex items-start gap-2">
                                                <span className="bg-[#00b140] text-white text-[11px] font-bold w-[48px] py-0.5 rounded shrink-0 text-center">지하철</span>
                                                <span className="pt-[1px]">2호선 부암역 6번 출구 도보 3분</span>
                                            </p>
                                            <p className="flex items-start gap-2">
                                                <span className="bg-[#3b609c] text-white text-[11px] font-bold w-[48px] py-0.5 rounded shrink-0 text-center">주차</span>
                                                <span className="pt-[1px]">건물 내 전용 주차장 완비</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- 네 번째 섹션: 결론 멘트 (최종 조율) --- */}
                <section className="w-full bg-[#fcfdfe] pt-20 pb-28 px-6 relative z-10 flex flex-col items-center justify-center text-center font-pretendard border-t border-gray-100">
                    <div className="max-w-[600px] w-full">
                        {/* 상단 포인트 라벨 */}
                        <div className="inline-flex items-center justify-center bg-[#eef2ff] text-[#3b609c] px-4 py-1.5 rounded-full mb-8 shadow-sm">
                            <span className="text-[14px] md:text-[16px] font-bold tracking-tight">
                                Exclusive Surgical Excellence
                            </span>
                        </div>

                        {/* 메인 헤드라인 (스크롤 연동 애니메이션 - Grid 기반 완벽 정렬) */}
                        <div ref={conclusionTextRef} className="text-[26px] md:text-[34px] font-extrabold leading-[1.35] text-[#111111] tracking-[-0.03em] break-keep mb-10 w-full">
                            <h2 className="flex flex-col items-center gap-1 md:gap-2">
                                {/* 첫 번째 줄 (0~33% 구간) */}
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10">수많은 신경외과 전문의가</span>
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.min(100, conclusionTextProgress * 3)}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.min(100, conclusionTextProgress * 3)}% 0 0)`
                                        }}
                                    >
                                        수많은 신경외과 전문의가
                                    </span>
                                </div>
                                
                                {/* 두 번째 줄 (33~66% 구간) */}
                                <div className="grid place-items-center">
                                    <span className="col-start-1 row-start-1 text-[#111111]/10">연세척병원을 찾아오는 이유,</span>
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (conclusionTextProgress - 33.3) * 3))}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (conclusionTextProgress - 33.3) * 3))}% 0 0)`
                                        }}
                                    >
                                        연세척병원을 찾아오는 이유,
                                    </span>
                                </div>

                                {/* 세 번째 줄 (66~100% 구간: 텍스트 + 밑줄) */}
                                <div className="grid place-items-center relative mt-2 md:mt-3">
                                    {/* 배경 레이어 (정렬 어긋남 방지를 위해 opacity 대신 고정 색상 지향) */}
                                    <span className="col-start-1 row-start-1 text-[#111111]/10 whitespace-nowrap">
                                        <span className="text-[#3b609c] opacity-20">&apos;압도적인 수술 결과&apos;</span>에 있습니다.
                                    </span>
                                    {/* 채워지는 레이어 */}
                                    <span 
                                        className="col-start-1 row-start-1 text-[#111111] whitespace-nowrap overflow-hidden z-10"
                                        style={{ 
                                            clipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (conclusionTextProgress - 66.6) * 3))}% 0 0)`,
                                            WebkitClipPath: `inset(0 ${100 - Math.max(0, Math.min(100, (conclusionTextProgress - 66.6) * 3))}% 0 0)`
                                        }}
                                    >
                                        <span className="text-[#3b609c]">&apos;압도적인 수술 결과&apos;</span>에 있습니다.
                                    </span>
                                    
                                    {/* 밑줄 (텍스트가 어느정도 채워질 때 같이 채워짐) */}
                                    <span 
                                        className="absolute bottom-1.5 left-0 h-3 bg-[#3b609c]/15 z-0 origin-left"
                                        style={{ 
                                            width: '100%',
                                            transform: `scaleX(${Math.max(0, Math.min(1, (conclusionTextProgress - 75) * 4))})`
                                        }}
                                    ></span>
                                </div>
                            </h2>
                        </div>

                        {/* 서브 메시지 */}
                        <div className="text-[17px] md:text-[21px] font-bold leading-[1.7] text-gray-600 tracking-[-0.02em] break-keep">
                            <p className="mb-4 text-gray-800">
                                지긋지긋한 통증, 이제 끝낼 때입니다.
                            </p>
                            <p>
                                숙련된 전문의의 <span className="text-[#3b609c] font-black underline decoration-2 underline-offset-4">미세한 컨트롤</span>,
                            </p>
                            <p>
                                이것이 다른 의사들이 연세척병원을 찾아와<br />
                                직접 눈으로 확인하고 배우는
                            </p>
                            <p className="mt-4 text-[19px] md:text-[23px] text-[#111111]">
                                <span className="text-[#3b609c] font-black">&apos;결과의 차이&apos;</span>입니다.
                            </p>
                        </div>

                        {/* 하단 로고 */}
                        <div className="mt-16 flex justify-center opacity-90 transition-transform hover:scale-105 duration-300">
                            <Image src="/images/logo.png" alt="연세척병원 로고" width={220} height={60} className="h-16 object-contain w-auto drop-shadow-sm" />
                        </div>
                    </div>
                </section>


                {/* --- 정형외과 페이지 바로가기 배너 --- */}
                <section className="w-full bg-gradient-to-r from-[#0d9488] to-[#14b8a6] py-8 px-6 relative z-10">
                    <div className="max-w-[500px] mx-auto flex flex-col items-center text-center gap-4">
                        <div className="inline-flex items-center gap-2 bg-white/15 px-4 py-1.5 rounded-full border border-white/20">
                            <span className="text-white/90 text-[13px] font-bold tracking-wider">ORTHOPEDIC</span>
                        </div>
                        <h3 className="text-white text-[22px] md:text-[25px] font-extrabold leading-[1.35] tracking-tight break-keep">
                            무릎 통증, 원인을 모르겠다면?<br />
                            <span className="text-emerald-200">관절내시경으로 직접 확인하세요</span>
                        </h3>
                        <p className="text-white/80 text-[14px] md:text-[15px] font-medium leading-[1.5] break-keep">
                            정형외과 최호 원장의 원데이 관절내시경
                        </p>
                        <Link
                            href="/orthopedic"
                            className="mt-2 bg-white text-[#0d9488] font-bold text-[17px] px-8 py-4 rounded-2xl shadow-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            정형외과 관절내시경 자세히 보기
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                </section>

                {/* --- 하단 고정 버튼 (스크롤 시 활성화되어 상담 팝업창을 엽니다) --- */}
                <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[640px] bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${showBottomNav ? 'translate-y-0' : 'translate-y-full'}`}>
                    <button
                        onClick={() => { if (!isPopupOpen) setIsPopupOpen(true); }}
                        className="w-full mx-auto block bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold text-xl py-5 rounded-2xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_25px_-4px_rgba(37,99,235,0.5)] active:scale-[0.98] animate-pulse-gentle shine-effect"
                    >
                        <div className="flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 animate-bounce">
                                <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                            </svg>
                            간편 비용 문의 · 상담
                        </div>
                    </button>
                </div>

                {/* --- 상담 신청(메모) 팝업 창 --- */}
                <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 flex justify-center items-end ${isPopupOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => { setIsPopupOpen(false); setPolicyViewerType(null); }}>

                    {/* 팝업 컨텐츠 */}
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
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">연락처 <span className="text-red-500">*</span></label>
                                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">주요 증상 부위 <span className="text-red-500">*</span></label>
                                <div className="flex flex-wrap gap-2">
                                    {['목', '허리', '어깨', '무릎', '기타'].map((symptom) => (
                                        <button
                                            key={symptom}
                                            type="button"
                                            onClick={() => setMemo(symptom)}
                                            className={`flex-1 min-w-[70px] py-3 px-3 rounded-xl border text-[15px] font-bold transition-all ${
                                                memo === symptom 
                                                    ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:bg-blue-50'
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
                                        <div className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-all ${agreedPrivacy ? 'bg-blue-600 border-blue-600 shadow-sm' : 'bg-white border-gray-300'}`}>
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
                                        className="text-[13px] text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        &lt;자세히보기&gt;
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div 
                                        className="flex items-center gap-2 cursor-pointer group"
                                        onClick={() => setAgreedCollection(!agreedCollection)}
                                    >
                                        <div className={`w-[22px] h-[22px] rounded border flex items-center justify-center transition-all ${agreedCollection ? 'bg-blue-600 border-blue-600 shadow-sm' : 'bg-white border-gray-300'}`}>
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
                                        className="text-[13px] text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        &lt;자세히보기&gt;
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full font-bold py-4 rounded-xl mt-2 shadow-lg transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
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
