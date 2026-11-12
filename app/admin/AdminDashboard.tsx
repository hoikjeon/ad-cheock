'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PAGE_LABELS } from '../lib/analytics';
import type { BarRow, BreakdownRow, ClickRow, PageFilter, RangeKey, Stats } from '../lib/adminStats';

const PAGE_TABS: [PageFilter, string][] = [['all', '전체'], ['spine', '척추'], ['ortho', '정형외과']];
const RANGE_TABS: [RangeKey, string][] = [['today', '오늘'], ['7d', '7일'], ['30d', '30일'], ['weekly', '주별'], ['monthly', '월별']];

const timeFormat = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', hour: '2-digit', minute: '2-digit', hour12: false });
const dateTimeFormat = new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false });

export default function AdminDashboard() {
    const router = useRouter();
    const [page, setPage] = useState<PageFilter>('all');
    const [range, setRange] = useState<RangeKey>('today');
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/admin/stats?page=${page}&range=${range}`, { cache: 'no-store' });
            if (res.status === 401) {
                router.replace('/admin/login');
                return;
            }
            const body = await res.json();
            if (!res.ok) throw new Error(body?.error ?? '통계를 불러오지 못했습니다.');
            setStats(body);
        } catch (e) {
            setError(e instanceof Error ? e.message : '통계를 불러오지 못했습니다.');
        }
        setLoading(false);
    }, [page, range, router]);

    useEffect(() => { load(); }, [load]);

    const logout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' }).catch(() => {});
        router.replace('/admin/login');
    };

    return (
        <main className="mx-auto max-w-[1180px] px-4 pb-16 pt-8 md:px-8">
            <header className="flex items-center justify-between gap-4">
                <h1 className="text-[24px] font-bold tracking-tight">방문 통계</h1>
                <button onClick={logout} className="text-[14px] text-[#5b6476] underline underline-offset-4 hover:text-[#1c2433]">로그아웃</button>
            </header>

            <div className="mt-6 flex flex-wrap items-center gap-3">
                <Segmented<PageFilter> items={PAGE_TABS} value={page} onChange={setPage} />
                <Segmented<RangeKey> items={RANGE_TABS} value={range} onChange={setRange} />
                <button onClick={load} className="text-[14px] font-medium text-[#294f7e] underline underline-offset-4">새로고침</button>
                {stats && <span className="text-[13px] text-[#7a8292]">{timeFormat.format(new Date(stats.generatedAt))} 기준</span>}
                {loading && <span className="text-[13px] text-[#7a8292]">불러오는 중...</span>}
            </div>

            {error && <p className="mt-6 rounded-xl border border-[#f1c6c6] bg-[#fdf1f1] px-4 py-3 text-[14px] text-[#b33a3a]">{error}</p>}

            {stats && (
                <div className={`mt-6 space-y-4 transition-opacity ${loading ? 'opacity-60' : ''}`}>
                    <div className="grid gap-4 md:grid-cols-3">
                        <SummaryCard label="방문" metric={stats.summary.visits} compareLabel={stats.compareLabel} />
                        <SummaryCard label="상담 신청" metric={stats.summary.consults} compareLabel={stats.compareLabel} />
                        <SummaryCard label="전화·네이버 예약" metric={stats.summary.contacts} compareLabel={stats.compareLabel} />
                    </div>

                    <Card title="기간별 추이">
                        <div className="grid gap-8 md:grid-cols-2">
                            <TrendChart title="방문" labels={stats.trend.labels} values={stats.trend.visits} />
                            <TrendChart title="상담 신청" labels={stats.trend.labels} values={stats.trend.consults} />
                        </div>
                    </Card>

                    <div className="grid items-start gap-4 lg:grid-cols-2">
                        <div className="space-y-4">
                            <Card title="상담 신청까지" desc="각 단계에 도달한 방문 수">
                                <BarList head={['단계', '방문']} rows={stats.funnel} />
                                <p className="mt-6 text-[13px] font-semibold text-[#5b6476]">전화·네이버 예약</p>
                                <p className="text-[12px] text-[#8a92a1]">신청 대신 바로 연락을 고른 방문 (위 단계와 별도)</p>
                                <BarList head={['구분', '방문']} rows={stats.contacts} />
                            </Card>

                            <Card title="디바이스">
                                <Breakdown title="기기" rows={stats.devices.device} />
                                <Breakdown title="운영체제" rows={stats.devices.os} />
                                <Breakdown title="브라우저·앱" rows={stats.devices.browser} />
                            </Card>

                            <Card title="유입 경로">
                                <Breakdown title="출처" rows={stats.sources.source} />
                                <Breakdown title="캠페인·소재" rows={stats.sources.campaign} empty="광고 링크에 utm 값이 붙은 방문이 없어요." />
                            </Card>
                        </div>

                        <div className="space-y-4">
                            <Card title="버튼 클릭">
                                <ClickList rows={stats.clicks} />
                            </Card>
                            <Card title="페이지를 어디까지 봤나" desc="섹션에 도달한 방문 수">
                                <BarList head={['섹션', '방문']} rows={stats.sections} />
                            </Card>
                        </div>
                    </div>

                    <Card title="상담 신청 목록" desc="기간 내 신청, 최신순 (최대 100건)">
                        <ConsultTable rows={stats.consultations} />
                    </Card>

                    <div className="space-y-1 pt-2 text-[12.5px] leading-relaxed text-[#7a8292]">
                        <p>방문 통계는 기록 기능을 배포한 시점부터 집계돼요. 같은 브라우저 탭에서 페이지를 보는 동안을 방문 1건으로 셉니다.</p>
                        <p>상담 신청 수는 신청 DB 기준이며 이름에 test·테스트가 들어간 신청은 빼고, 같은 연락처의 중복 신청은 1건으로 셉니다.</p>
                        <p>디바이스·유입 경로 표의 신청 수는 방문 기록 기준이라 위 합계와 조금 다를 수 있어요.</p>
                    </div>
                </div>
            )}
        </main>
    );
}

function Segmented<T extends string>({ items, value, onChange }: { items: [T, string][]; value: T; onChange: (v: T) => void }) {
    return (
        <div className="inline-flex rounded-xl bg-[#e7e9ee] p-1">
            {items.map(([key, label]) => (
                <button
                    key={key}
                    onClick={() => onChange(key)}
                    className={`rounded-lg px-3.5 py-1.5 text-[14px] font-semibold transition-colors ${value === key ? 'bg-white text-[#1c2433] shadow-sm' : 'text-[#5b6476] hover:text-[#1c2433]'}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
    return (
        <section className="min-w-0 rounded-2xl border border-[#e3e6eb] bg-white p-5 md:p-6">
            <h2 className="text-[16px] font-bold">{title}</h2>
            {desc && <p className="mt-0.5 text-[12.5px] text-[#8a92a1]">{desc}</p>}
            <div className="mt-4">{children}</div>
        </section>
    );
}

function SummaryCard({ label, metric, compareLabel }: { label: string; metric: { value: number; compare: number }; compareLabel: string }) {
    const diff = metric.value - metric.compare;
    return (
        <div className="rounded-2xl border border-[#e3e6eb] bg-white px-5 py-4">
            <p className="text-[14px] text-[#5b6476]">{label}</p>
            <p className="mt-1 text-[32px] font-bold tabular-nums leading-tight">{metric.value.toLocaleString()}</p>
            <p className="mt-1 text-[12.5px] text-[#7a8292]">
                {compareLabel} {metric.compare.toLocaleString()}
                {diff !== 0 && <span className={`ml-1.5 font-semibold ${diff > 0 ? 'text-[#2f7d4f]' : 'text-[#c0533f]'}`}>{diff > 0 ? '▲' : '▼'} {Math.abs(diff)}</span>}
            </p>
        </div>
    );
}

function niceMax(value: number) {
    if (value <= 2) return 2;
    const step = Math.pow(10, Math.floor(Math.log10(value)));
    const top = Math.ceil(value / step) * step;
    return top % 2 === 0 ? top : top + step;
}

function TrendChart({ title, labels, values }: { title: string; labels: string[]; values: number[] }) {
    const [asTable, setAsTable] = useState(false);
    const max = niceMax(Math.max(0, ...values));
    const every = labels.length > 12 ? Math.ceil(labels.length / 6) : labels.length > 8 ? 2 : 1;

    return (
        <div className="min-w-0">
            <p className="text-[14px] font-semibold">{title}</p>
            {asTable ? (
                <div className="mt-3 max-h-[220px] overflow-y-auto">
                    <table className="w-full text-[13px] tabular-nums">
                        <tbody>
                            {labels.map((label, i) => (
                                <tr key={label} className="border-b border-[#f0f1f4]">
                                    <td className="py-1.5 text-[#5b6476]">{label}</td>
                                    <td className="py-1.5 text-right">{values[i]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="mt-3 flex gap-2">
                    <div className="flex h-[150px] flex-col justify-between text-right text-[11px] tabular-nums text-[#8a92a1]">
                        <span>{max}</span><span>{max / 2}</span><span>0</span>
                    </div>
                    <div className="min-w-0 flex-1">
                        <div className="relative flex h-[150px] items-end gap-[2px] border-b border-[#dfe2e8]">
                            <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-[#f0f1f4]" />
                            <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-[#f0f1f4]" />
                            {values.map((v, i) => (
                                <div key={labels[i]} className="group relative flex h-full flex-1 items-end">
                                    <div className="w-full rounded-t-[3px] bg-[#294f7e]" style={{ height: `${(v / max) * 100}%` }} />
                                    <span className="pointer-events-none absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 whitespace-nowrap rounded bg-[#1c2433] px-1.5 py-0.5 text-[11px] text-white group-hover:block">
                                        {labels[i]} · {v}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-1.5 flex gap-[2px] text-[11px] text-[#8a92a1]">
                            {labels.map((label, i) => (
                                <span key={label} className="flex-1 overflow-visible whitespace-nowrap">{i % every === 0 ? label : ''}</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <button onClick={() => setAsTable(!asTable)} className="mt-3 text-[12.5px] text-[#5b6476] underline underline-offset-4">
                {asTable ? '차트로 보기' : '표로 보기'}
            </button>
        </div>
    );
}

function Bar({ value, base }: { value: number; base: number }) {
    const width = base > 0 ? Math.min(100, (value / base) * 100) : 0;
    return (
        <div className="mt-1.5 h-[6px] rounded-full bg-[#eef0f4]">
            <div className="h-full rounded-full bg-[#294f7e]" style={{ width: `${width}%` }} />
        </div>
    );
}

function TableHead({ cells }: { cells: string[] }) {
    return (
        <div className="flex border-b border-[#eceef2] pb-2 text-[12px] text-[#8a92a1]">
            <span className="flex-1">{cells[0]}</span>
            {cells.slice(1).map((c) => <span key={c} className="w-14 text-right">{c}</span>)}
        </div>
    );
}

function BarList({ head, rows }: { head: string[]; rows: BarRow[] }) {
    return (
        <div>
            <TableHead cells={head} />
            {rows.map((row) => (
                <div key={row.label} className="border-b border-[#f3f4f6] py-2.5">
                    <div className="flex text-[14px]">
                        <span className="flex-1">{row.label}</span>
                        <span className="w-14 text-right tabular-nums">{row.value}</span>
                    </div>
                    <Bar value={row.value} base={row.base} />
                </div>
            ))}
        </div>
    );
}

function ClickList({ rows }: { rows: ClickRow[] }) {
    const max = Math.max(1, ...rows.map((r) => r.count));
    return (
        <div>
            <TableHead cells={['버튼', '누른 횟수', '누른 방문']} />
            {rows.map((row) => (
                <div key={row.label} className="border-b border-[#f3f4f6] py-2.5">
                    <div className="flex text-[14px]">
                        <span className="flex-1 font-semibold">{row.label}</span>
                        <span className="w-14 text-right tabular-nums">{row.count}</span>
                        <span className="w-14 text-right tabular-nums">{row.visits}</span>
                    </div>
                    <Bar value={row.count} base={max} />
                </div>
            ))}
        </div>
    );
}

function Breakdown({ title, rows, empty = '아직 기록이 없어요.' }: { title: string; rows: BreakdownRow[]; empty?: string }) {
    const max = Math.max(1, ...rows.map((r) => r.visits));
    return (
        <div className="mb-6 last:mb-0">
            <p className="mb-2 text-[13px] font-semibold text-[#5b6476]">{title}</p>
            <TableHead cells={['구분', '방문', '신청']} />
            {rows.length === 0 && <p className="py-3 text-[13px] text-[#8a92a1]">{empty}</p>}
            {rows.map((row) => (
                <div key={row.label} className="border-b border-[#f3f4f6] py-2.5">
                    <div className="flex text-[14px]">
                        <span className="min-w-0 flex-1 break-all">{row.label}</span>
                        <span className="w-14 text-right tabular-nums">{row.visits}</span>
                        <span className="w-14 text-right tabular-nums">{row.consults}</span>
                    </div>
                    <Bar value={row.visits} base={max} />
                </div>
            ))}
        </div>
    );
}

function ConsultTable({ rows }: { rows: Stats['consultations'] }) {
    if (rows.length === 0) return <p className="py-3 text-[13px] text-[#8a92a1]">이 기간에 들어온 신청이 없어요.</p>;
    return (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[14px]">
                <thead>
                    <tr className="border-b border-[#eceef2] text-[12px] text-[#8a92a1]">
                        <th className="py-2 pr-4 font-normal">접수</th>
                        <th className="py-2 pr-4 font-normal">페이지</th>
                        <th className="py-2 pr-4 font-normal">이름</th>
                        <th className="py-2 pr-4 font-normal">연락처</th>
                        <th className="py-2 font-normal">메모</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, i) => (
                        <tr key={`${row.createdAt}-${i}`} className="border-b border-[#f3f4f6] align-top">
                            <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums text-[#5b6476]">{dateTimeFormat.format(new Date(row.createdAt))}</td>
                            <td className="whitespace-nowrap py-2.5 pr-4">{PAGE_LABELS[row.page]}</td>
                            <td className="whitespace-nowrap py-2.5 pr-4 font-semibold">
                                {row.name}
                                {row.duplicate && <span className="ml-1.5 rounded bg-[#eef0f4] px-1.5 py-0.5 text-[11px] font-medium text-[#5b6476]">중복</span>}
                            </td>
                            <td className="whitespace-nowrap py-2.5 pr-4 tabular-nums">
                                <a href={`tel:${row.phone}`} className="hover:underline">{row.phone}</a>
                            </td>
                            <td className="py-2.5 text-[#3d4556]">{row.memo}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
