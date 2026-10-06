import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '개인정보처리방침 | 연세척병원',
    description: '연세척병원 개인정보처리방침',
};

// TODO: 아래 항목은 병원 내부 확인 후 실제 정보로 교체해야 합니다.
const PRIVACY_OFFICER = {
    name: '전호익',
    position: '대리',
    phone: '010-8522-9499',
    email: 'hibestme2@naver.com',
};
const HOSPITAL_PHONE = '051-935-1004';
const EFFECTIVE_DATE = '2026년 10월 6일';

type Section = { title: string; body: React.ReactNode };

const SECTIONS: Section[] = [
    {
        title: '제1조 (개인정보의 처리 목적)',
        body: (
            <>
                <p>연세척병원(이하 &lsquo;병원&rsquo;)은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.</p>
                <ul>
                    <li>온라인 상담 신청 접수 및 진료 상담, 비용 안내</li>
                    <li>상담 신청 내역 확인 및 예약 안내 (전화, 문자, SNS)</li>
                </ul>
            </>
        ),
    },
    {
        title: '제2조 (처리하는 개인정보의 항목)',
        body: (
            <>
                <p>병원은 홈페이지 상담 신청 시 다음의 개인정보를 수집합니다.</p>
                <ul>
                    <li>필수 항목 : 성명, 연락처</li>
                    <li>민감정보(건강정보) : 증상 부위 및 통증 관련 정보 &mdash; 「개인정보 보호법」 제23조에 따라 별도 동의를 받아 처리합니다.</li>
                    <li>자동 수집 항목 : 접속 기록, 쿠키, 접속 기기 및 브라우저 정보 (서비스 이용 통계 목적)</li>
                </ul>
            </>
        ),
    },
    {
        title: '제3조 (개인정보의 처리 및 보유 기간)',
        body: (
            <>
                <p>병원은 정보주체로부터 개인정보를 수집할 때 동의받은 보유 기간 내에서 개인정보를 처리·보유합니다.</p>
                <ul>
                    <li>상담 신청 정보 : 수집일로부터 2년</li>
                    <li>정보주체가 동의를 철회하는 경우 지체 없이 파기합니다.</li>
                </ul>
            </>
        ),
    },
    {
        title: '제4조 (개인정보의 파기 절차 및 방법)',
        body: (
            <ul>
                <li>파기 절차 : 보유 기간이 지난 개인정보는 매일 1회 자동으로 확인하여 지체 없이 파기합니다.</li>
                <li>파기 방법 : 전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적 방법으로 영구 삭제합니다.</li>
            </ul>
        ),
    },
    {
        title: '제5조 (개인정보의 제3자 제공)',
        body: <p>병원은 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만 처리하며, 정보주체의 동의 또는 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우를 제외하고는 개인정보를 제3자에게 제공하지 않습니다.</p>,
    },
    {
        title: '제6조 (개인정보 처리업무의 위탁 및 국외 이전)',
        body: (
            <>
                <p>병원은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있으며, 수탁자의 서버가 국외에 있어 개인정보가 국외로 이전됩니다.</p>
                <div className="overflow-x-auto">
                    <table>
                        <thead>
                            <tr><th>수탁자</th><th>위탁 업무</th><th>이전 국가</th></tr>
                        </thead>
                        <tbody>
                            <tr><td>Supabase Inc.</td><td>상담 신청 정보 저장 및 데이터베이스 관리</td><td>미국 등</td></tr>
                            <tr><td>Slack Technologies, LLC</td><td>상담 신청 접수 알림 (병원 내부 전달)</td><td>미국</td></tr>
                            <tr><td>Vercel Inc.</td><td>홈페이지 호스팅 및 서버 운영</td><td>미국 등</td></tr>
                        </tbody>
                    </table>
                </div>
                <ul>
                    <li>이전 항목 : 성명, 연락처, 증상 부위</li>
                    <li>이전 일시 및 방법 : 상담 신청 시 네트워크를 통해 전송</li>
                    <li>보유 및 이용 기간 : 위탁계약 종료 시 또는 제3조의 보유 기간 만료 시까지</li>
                    <li>국외 이전을 원하지 않으시는 경우 온라인 상담 신청 대신 대표번호({HOSPITAL_PHONE})로 전화 상담을 이용하실 수 있습니다.</li>
                </ul>
            </>
        ),
    },
    {
        title: '제7조 (정보주체의 권리·의무 및 행사 방법)',
        body: (
            <>
                <p>정보주체는 병원에 대해 언제든지 다음의 권리를 행사할 수 있습니다.</p>
                <ul>
                    <li>개인정보 열람 요구</li>
                    <li>오류 등이 있을 경우 정정 요구</li>
                    <li>삭제 요구</li>
                    <li>처리 정지 요구 및 동의 철회</li>
                </ul>
                <p>권리 행사는 아래 제10조의 개인정보 보호책임자에게 전화 또는 이메일로 하실 수 있으며, 병원은 이에 대해 지체 없이 조치하겠습니다.</p>
            </>
        ),
    },
    {
        title: '제8조 (개인정보의 안전성 확보 조치)',
        body: (
            <ul>
                <li>개인정보 저장 데이터베이스에 대한 접근 권한 제한 및 관리</li>
                <li>전송 구간 암호화(HTTPS) 적용</li>
                <li>보유 기간 경과 정보의 자동 파기</li>
                <li>개인정보 취급 직원의 최소화 및 교육</li>
            </ul>
        ),
    },
    {
        title: '제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부)',
        body: (
            <>
                <p>병원은 홈페이지 이용 통계 분석을 위해 Google Tag Manager 및 Vercel Analytics 등을 이용하며, 이 과정에서 쿠키 등이 사용될 수 있습니다.</p>
                <p>정보주체는 웹 브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다. 다만 쿠키 저장을 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다.</p>
            </>
        ),
    },
    {
        title: '제10조 (개인정보 보호책임자)',
        body: (
            <>
                <p>병원은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 정보주체의 불만 처리 및 피해 구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.</p>
                <ul>
                    <li>성명 : {PRIVACY_OFFICER.name}</li>
                    <li>직책 : {PRIVACY_OFFICER.position}</li>
                    <li>연락처 : {PRIVACY_OFFICER.phone}</li>
                    <li>이메일 : {PRIVACY_OFFICER.email}</li>
                </ul>
            </>
        ),
    },
    {
        title: '제11조 (권익침해 구제 방법)',
        body: (
            <>
                <p>정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담 등을 신청할 수 있습니다.</p>
                <ul>
                    <li>개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)</li>
                    <li>개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)</li>
                    <li>대검찰청 : (국번없이) 1301 (www.spo.go.kr)</li>
                    <li>경찰청 : (국번없이) 182 (ecrm.police.go.kr)</li>
                </ul>
            </>
        ),
    },
    {
        title: '제12조 (개인정보처리방침의 변경)',
        body: <p>이 개인정보처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 내용의 추가·삭제 및 수정이 있을 경우 시행 7일 전부터 홈페이지를 통해 고지합니다.</p>,
    },
];

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-gray-900 flex justify-center">
            <main className="w-full min-w-0 max-w-[640px] bg-white min-h-screen px-6 py-12">
                <Link href="/" className="text-[14px] text-gray-400 hover:text-blue-600 transition-colors">
                    &larr; 홈으로
                </Link>

                <h1 className="mt-6 text-[28px] font-extrabold text-gray-900 tracking-tight">개인정보처리방침</h1>
                <p className="mt-3 text-[15px] text-gray-500 leading-relaxed break-keep">
                    연세척병원은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보처리방침을 수립·공개합니다.
                </p>

                <div className="mt-10 flex flex-col gap-10">
                    {SECTIONS.map((section) => (
                        <section key={section.title} className="privacy-section">
                            <h2 className="text-[18px] font-bold text-gray-900 mb-3">{section.title}</h2>
                            <div className="text-[15px] text-gray-600 leading-relaxed break-keep space-y-3">
                                {section.body}
                            </div>
                        </section>
                    ))}
                </div>

                <p className="mt-14 pt-6 border-t border-gray-100 text-[13px] text-gray-400">
                    시행일자 : {EFFECTIVE_DATE}
                </p>
            </main>

            <style>{`
                .privacy-section ul { list-style: disc; padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.35rem; }
                .privacy-section table { width: 100%; border-collapse: collapse; font-size: 13px; }
                .privacy-section th, .privacy-section td { border: 1px solid #e5e7eb; padding: 0.5rem 0.6rem; text-align: left; vertical-align: top; }
                .privacy-section th { background: #f9fafb; color: #374151; font-weight: 700; }
            `}</style>
        </div>
    );
}
