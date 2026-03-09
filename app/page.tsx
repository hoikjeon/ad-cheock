"use client"; // 이 페이지에서 상태(입력창)를 사용하겠다고 선언하는 필수 코드

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

// 1. Supabase 연결 세팅 (env 파일에서 아까 넣은 주소와 열쇠를 가져옵니다)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MobileMain() {
    // 2. 입력창 데이터 저장소 (이름, 폰번호, 증상)
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [memo, setMemo] = useState('');

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
            // 전송 성공 후 입력창 싹 비우기
            setName('');
            setPhone('');
            setMemo('');
        }
    };

    return (
        // 전체 배경을 부드러운 회색으로 깔고 모바일 사이즈로 고정
        <div className="w-full max-w-md mx-auto bg-gray-50 font-sans min-h-screen pb-12">

            {/* --- 첫 번째 섹션: 기존 메인 히어로 (수술실 배경) --- */}
            <div className="relative w-full h-[100dvh] bg-gray-900 overflow-hidden flex flex-col justify-between p-6 shadow-xl z-10">
                <div className="absolute inset-0 z-0" style={{ backgroundImage: 'url("/images/bg-surgery.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="absolute inset-0 bg-black/65"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mt-8">
                        <img src="/images/logo.png" alt="연세척병원 로고" className="h-12 object-contain bg-white/90 px-3 py-1.5 rounded-lg shadow-sm" />
                    </div>

                    <div className="mb-auto mt-24">
                        <p className="text-yellow-400 font-semibold text-sm md:text-base mb-3 tracking-wide drop-shadow-md">해외의사들도 배우러 오는 곳</p>
                        <h1 className="text-white text-3xl md:text-4xl font-extrabold leading-snug drop-shadow-lg break-keep">
                            양방향척추내시경<br />연세척병원
                        </h1>
                    </div>

                    <div className="flex flex-col gap-3 pb-6">
                        <Link href="https://map.naver.com/p/search/%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90/place/35643868?placePath=/home?bk_query=%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90&entry=pll&from=nx&fromNxList=true&from=map&fromPanelNum=2&timestamp=202603061509&locale=ko&svcName=map_pcv5&searchText=%EC%97%B0%EC%84%B8%EC%B2%99%EB%B3%91%EC%9B%90&entry=pll&from=nx&fromNxList=true&searchType=place&c=15.00,0,0,0,dh" target="_blank" className="w-full bg-[#03c75a] hover:bg-[#02b350] text-white text-center py-4 rounded-xl font-bold text-lg shadow-lg transition-colors flex items-center justify-center gap-2">
                            <span className="font-black">N</span> 네이버 예약
                        </Link>
                        <Link href="https://www.ys-cheok.com/001/004_4.php#doctorProfile" target="_blank" className="w-full bg-gray-100 hover:bg-gray-200 text-blue-600 text-center py-4 rounded-xl font-bold text-lg shadow-lg transition-colors">
                            의료진 바로보기
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- 두 번째 섹션: 상담 신청 폼 (스크롤해서 내려오면 보임) --- */}
            <div className="p-8 bg-white mt-4 rounded-t-3xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)] relative z-20">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">빠른 상담 신청</h2>
                <p className="text-gray-500 text-sm mb-6">아픈 곳을 남겨주시면 전문 상담원이 빠르게 연락드립니다.</p>

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
    );
}