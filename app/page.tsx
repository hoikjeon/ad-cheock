'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function LandingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', symptom: '' });
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showCTA, setShowCTA] = useState(false);

    const observerRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    const heroObserverRef = useRef<HTMLDivElement>(null);
    const [isHeroVisible, setIsHeroVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsHeroVisible(true);
                    if (heroObserverRef.current) observer.unobserve(heroObserverRef.current);
                }
            },
            { threshold: 0.2 }
        );
        if (heroObserverRef.current) observer.observe(heroObserverRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (observerRef.current) {
                        observer.unobserve(observerRef.current);
                    }
                }
            },
            { threshold: 0.2 }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const images = ['/images/doctor.jpg', '/images/doctor2.jpg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000); // 5초마다 타이머 작동
        return () => clearInterval(interval);
    }, []);

    // 스크롤 이벤트 (스크롤을 조금 내렸을 때 CTA 노출)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setShowCTA(true);
            } else {
                setShowCTA(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 폼 제출 핸들러 (이후 Supabase Insert 로직 연결)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        /*
          TODO: Supabase DB 연동 예시
          const { data, error } = await supabase
            .from('consultations')
            .insert([{ 
              patient_name: formData.name, 
              phone_number: formData.phone, 
              symptom_area: formData.symptom 
            }]);
        */
        console.log('수집된 환자 DB:', formData);
        alert('상담 신청이 완료되었습니다. 곧 연락드리겠습니다.');
        setIsModalOpen(false);
        setFormData({ name: '', phone: '', symptom: '' }); // 폼 초기화
    };

    return (
        <div className="relative min-h-screen bg-gray-900 font-sans flex justify-center">
            {/* Mobile Container */}
            <div className="w-full max-w-[375px] bg-white relative pb-32 shadow-2xl overflow-hidden min-h-screen">
                {/* 1. 메인 히어로 공간 (100dvh 높이 적용) */}
                <div className="relative w-full h-[100dvh] bg-gray-900 overflow-hidden font-sans">
                    {/* 1-1. 배경 이미지 슬라이더 (Ken Burns effect & Crossfade) */}
                    {images.map((img, idx) => (
                        <div
                            key={idx}
                            className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${img})` }}
                            ></div>
                        </div>
                    ))}
                    {/* 텍스트 가독성을 위해 전체 배경을 살짝 어둡게 누름 */}
                    <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none"></div>

                    {/* 1-2. 콘텐츠 영역 */}
                    <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-20">

                        {/* 상단: 로고 (텍스트 그룹과 분리하여 상단 중앙에 2배 크기로 배치) */}
                        <div className="absolute top-12 left-0 w-full flex justify-center">
                            <img
                                src="/images/logo-white.png"
                                alt="연세척병원 로고"
                                className="h-24 object-contain w-auto drop-shadow-md"
                            />
                        </div>

                        {/* 하단: 메인 카피 텍스트 블록 (사진 하단으로 배치) */}
                        <div
                            ref={heroObserverRef}
                            className={`text-left mb-6 transition-all duration-1000 ease-out transform delay-300 ${isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        >
                            <p className="text-yellow-400 font-extrabold text-[20px] mb-2 drop-shadow-md font-pretendard tracking-[-0.01em]">
                                해외 의사도 배우러 오는 곳
                            </p>
                            <h1 className="text-white text-[26.5px] font-extrabold leading-snug drop-shadow-lg font-pretendard tracking-[-0.01em] whitespace-nowrap">
                                해외에서 인정받는<br />
                                양방향 척추내시경 연세척병원
                            </h1>
                        </div>

                        {/* 하단: 액션 버튼 2개 (네이버 예약, 의료진 바로보기 세로 배치) */}
                        <div className="flex flex-col gap-3">
                            {/* 네이버 예약 버튼 (초록색, 풀 너비) */}
                            <Link
                                href="#"
                                className="w-full bg-[#00c73c] hover:bg-[#00ab33] text-white text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                            >
                                <span className="font-extrabold text-[20px]">N</span> 네이버 예약
                            </Link>

                            {/* 의료진 바로보기 버튼 (밝은 회색, 네이버 예약과 동일한 크기) */}
                            <Link
                                href="#"
                                className="w-full bg-[#EAEAEA] hover:bg-gray-200 text-[#0d6efd] text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors cursor-pointer"
                            >
                                의료진 바로보기
                            </Link>
                        </div>
                    </div>
                </div>


                {/* 2. 유튜브 환자 후기 Section */}
                <section className="w-full bg-white py-16 px-5">
                    <div
                        ref={observerRef}
                        className={`flex flex-col gap-6 text-center font-sans transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                            }`}
                    >
                        <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            실제 환자분들이<br />
                            증명하는 결과
                        </h2>
                        <p className="text-base font-semibold leading-[1.4] tracking-[-0.02em] text-[#727582]">
                            왜 연세척병원을 선택하고<br />
                            주변에 자신있게 추천하는지 직접 확인해보세요
                        </p>
                    </div>

                    {/* 유튜브 영상 임베드 */}
                    <div className="mt-8 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 relative aspect-video">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/50dNBoWAS4Y"
                            title="유튜브 환자 후기 영상"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>

                {/* 3. 하단 고정 CTA 버튼 (Sticky) - 스크롤 다운 시 나타남 */}
                <div
                    className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${showCTA ? 'translate-y-0' : 'translate-y-full'
                        }`}
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full mx-auto block bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition duration-300"
                    >
                        빠른 전화 상담하기
                    </button>
                </div>

                {/* 4. 개인정보 입력 폼 모달 */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-end md:items-center z-50 transition-opacity">
                        <div className="bg-white rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 relative animate-slide-up md:animate-none">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 text-xl font-bold"
                            >
                                ✕
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800">1:1 맞춤 상담 신청</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">성함</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="홍길동"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">연락처 (- 없이 숫자만)</label>
                                    <input
                                        type="tel"
                                        required
                                        pattern="[0-9]*"
                                        placeholder="01012345678"
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, '') })}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">상담 희망 부위</label>
                                    <select
                                        required
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                                        value={formData.symptom}
                                        onChange={(e) => setFormData({ ...formData, symptom: e.target.value })}
                                    >
                                        <option value="" disabled>가장 불편하신 부위를 선택해주세요</option>
                                        <option value="목">목</option>
                                        <option value="허리">허리</option>
                                        <option value="엉치">엉치</option>
                                        <option value="무릎">무릎</option>
                                        <option value="어깨">어깨</option>
                                    </select>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition duration-300"
                                    >
                                        무료 상담 신청 완료하기
                                    </button>
                                </div>
                                <p className="text-xs text-center text-gray-400 mt-2">
                                    신청 시 개인정보 수집 및 이용에 동의하는 것으로 간주합니다.
                                </p>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}