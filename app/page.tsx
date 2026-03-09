"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// 1. Supabase 연결 세팅 (env 파일에서 주소와 열쇠를 가져옵니다)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MobileMain() {
    // 2. 입력창 데이터 저장소 (이름, 폰번호, 증상)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [memo, setMemo] = useState('');

    // 팝업 상태 및 화면 애니메이션 상태
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showBottomNav, setShowBottomNav] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        const imageInterval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
        }, 3000);

        const scrollHandler = () => {
            if (window.scrollY > 100) {
                setShowBottomNav(true);
            } else {
                setShowBottomNav(false);
            }
        };
        window.addEventListener('scroll', scrollHandler);
        // 초기 렌더링 시에도 체크
        scrollHandler();

        return () => {
            clearInterval(imageInterval);
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    // 3. 상담 신청하기 버튼을 눌렀을 때 실행될 함수
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // 새로고침 방지

        if (!name || !phone) {
            alert('이름과 연락처를 꼭 입력해주세요!');
            return;
        }

        // Supabase 'consultations' 테이블에 데이터 밀어넣기
        const { error } = await supabase
            .from('consultations')
            .insert([{ patient_name: name, phone: phone, memo: memo }]);

        if (error) {
            alert('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            console.error(error);
        } else {
            alert('상담 신청이 완료되었습니다! 빠른 시일 내에 연락드리겠습니다.');
            // 전송 성공 후 입력창 및 팝업 닫기
            setName('');
            setPhone('');
            setMemo('');
            setIsPopupOpen(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-900 font-sans flex justify-center">
            <div className="w-full max-w-[375px] bg-white relative pb-32 shadow-2xl overflow-x-hidden min-h-screen">

                {/* --- 첫 번째 섹션: 메인 히어로 (배경 자동 전환) --- */}
                <div className="relative w-full h-[100dvh] bg-gray-900 overflow-hidden font-sans">
                    <div className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${currentImageIndex === 0 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/doctor.jpg')" }}></div>
                    </div>
                    <div className={`absolute inset-0 z-0 transition-opacity duration-[2000ms] ease-in-out ${currentImageIndex === 1 ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/doctor2.jpg')" }}></div>
                    </div>
                    <div className="absolute inset-0 bg-black/65 z-0 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-20">
                        <div className="absolute top-12 left-0 w-full flex justify-center">
                            <img src="/images/logo-white.png" alt="연세척병원 로고" className="h-24 object-contain w-auto drop-shadow-md" />
                        </div>

                        <div className={`text-left mb-6 transition-all duration-1000 ease-out transform delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                            <p className="text-yellow-400 font-extrabold text-[20px] mb-2 drop-shadow-md font-pretendard tracking-[-0.01em]">해외 의사도 배우러 오는 곳</p>
                            <h1 className="text-white text-[26.5px] font-extrabold leading-snug drop-shadow-lg font-pretendard tracking-[-0.01em] whitespace-nowrap">
                                해외에서 인정받는<br />양방향 척추내시경 연세척병원
                            </h1>
                        </div>

                        <div className="flex flex-col gap-3 relative z-20 pointer-events-auto">
                            <Link href="https://map.naver.com/p/search/%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90/place/35643868?placePath=/home?bk_query=%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90&entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202603061509&locale=ko&svcName=map_pcv5&searchText=%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh" target="_blank" className="w-full bg-[#00c73c] hover:bg-[#00ab33] text-white text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer relative z-30">
                                <span className="font-extrabold text-[20px]">N</span>
                                네이버 예약
                            </Link>
                            <Link href="https://www.ys-cheok.com/001/004_4.php#doctorProfile" target="_blank" className="w-full bg-[#EAEAEA] hover:bg-gray-200 text-[#0d6efd] text-center py-4 rounded-2xl font-bold text-[18px] shadow-lg transition-colors cursor-pointer relative z-30">
                                의료진 바로보기
                            </Link>
                        </div>
                    </div>
                </div>

                {/* --- 두 번째 섹션: 환자 후기 영상 --- */}
                <section className="w-full bg-white py-16 px-5 relative z-10">
                    <div className={`flex flex-col gap-6 text-center font-sans transition-all duration-1000 ease-out transform delay-100 ${showBottomNav ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <h2 className="text-[32px] font-bold leading-[1.35] tracking-[-0.02em] text-black">
                            실제 환자분들이<br />증명하는 결과
                        </h2>
                        <p className="text-base font-semibold leading-[1.4] tracking-[-0.02em] text-[#727582]">
                            왜 연세척병원을 선택하고<br />주변에 자신있게 추천하는지 직접 확인해보세요
                        </p>
                    </div>
                    <div className="mt-8 rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-100 relative aspect-video">
                        <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/50dNBoWAS4Y" title="유튜브 환자 후기 영상" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </section>

                {/* --- 하단 고정 버튼 (스크롤 시 활성화되어 상담 팝업창을 엽니다) --- */}
                <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[375px] bg-white border-t border-gray-200 py-4 px-6 z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-transform duration-500 ease-in-out ${showBottomNav ? 'translate-y-0' : 'translate-y-full'}`}>
                    <button onClick={() => setIsPopupOpen(true)} className="w-full mx-auto block bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition duration-300">
                        빠른 전화 상담하기
                    </button>
                </div>

                {/* --- 상담 신청(메모) 팝업 창 --- */}
                <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 flex justify-center items-end ${isPopupOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsPopupOpen(false)}>

                    {/* 팝업 컨텐츠 */}
                    <div className={`w-full max-w-[375px] bg-white rounded-t-3xl p-8 shadow-2xl transition-transform duration-500 ease-in-out ${isPopupOpen ? 'translate-y-0' : 'translate-y-full'}`} onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">빠른 상담 신청</h2>
                                <p className="text-gray-500 text-sm">아픈 곳을 남겨주시면 전문 상담원이 빠르게 연락드립니다.</p>
                            </div>
                            <button onClick={() => setIsPopupOpen(false)} className="text-gray-400 hover:text-gray-800 self-start p-1 transition-colors">
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
                                <label className="block text-sm font-semibold text-gray-700 mb-1">증상 및 문의내용</label>
                                <textarea value={memo} onChange={(e) => setMemo(e.target.value)} placeholder="예) 허리가 너무 아파요, 양방향내시경 비용이 궁금해요." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 resize-none"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl mt-2 shadow-lg transition-colors">
                                상담 신청하기
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}