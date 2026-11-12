-- 관리자 방문 통계용 테이블과 기록 함수
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 한 번 실행하세요. 여러 번 실행해도 안전합니다.

-- 방문 1건 = 1행. 섹션 도달·버튼 클릭·신청 단계는 같은 행에 누적합니다.
-- 이름·연락처 같은 개인정보와 IP는 저장하지 않습니다.
create table if not exists public.visits (
    id text primary key,                         -- 브라우저가 만든 방문 ID
    created_at timestamptz not null default now(),
    last_seen_at timestamptz not null default now(),
    page text not null,                          -- 'spine' | 'ortho'
    device text,
    os text,
    browser text,
    utm_source text,
    utm_campaign text,
    utm_content text,
    referrer text,                               -- 유입 사이트 도메인만 저장
    sections text[] not null default '{}',       -- 도달한 섹션 키
    steps text[] not null default '{}',          -- 상담 신청 단계 (open, submit, complete)
    clicks jsonb not null default '{}'           -- 버튼 키별 누른 횟수
);

create index if not exists visits_created_at_idx on public.visits (created_at);
create index if not exists visits_page_created_at_idx on public.visits (page, created_at);

-- 방문자 브라우저(anon 키)는 이 테이블을 읽거나 쓸 수 없습니다.
-- 기록은 서버(/api/track)가 service_role 키로 아래 함수를 호출해서만 합니다.
alter table public.visits enable row level security;

create or replace function public.track_visit(
    p_id text,
    p_page text,
    p_kind text,
    p_name text default null,
    p_meta jsonb default '{}'
) returns void
language plpgsql
set search_path = public
as $$
begin
    insert into visits (id, page, device, os, browser, utm_source, utm_campaign, utm_content, referrer)
    values (
        p_id, p_page,
        p_meta->>'device', p_meta->>'os', p_meta->>'browser',
        p_meta->>'utm_source', p_meta->>'utm_campaign', p_meta->>'utm_content', p_meta->>'referrer'
    )
    on conflict (id) do update set
        device = coalesce(visits.device, excluded.device),
        os = coalesce(visits.os, excluded.os),
        browser = coalesce(visits.browser, excluded.browser),
        utm_source = coalesce(visits.utm_source, excluded.utm_source),
        utm_campaign = coalesce(visits.utm_campaign, excluded.utm_campaign),
        utm_content = coalesce(visits.utm_content, excluded.utm_content),
        referrer = coalesce(visits.referrer, excluded.referrer),
        last_seen_at = now();

    if p_kind = 'section' then
        update visits set sections = array_append(sections, p_name)
        where id = p_id and not (p_name = any(sections));
    elsif p_kind = 'step' then
        update visits set steps = array_append(steps, p_name)
        where id = p_id and not (p_name = any(steps));
    elsif p_kind = 'click' then
        update visits set clicks = jsonb_set(clicks, array[p_name], to_jsonb(coalesce((clicks->>p_name)::int, 0) + 1))
        where id = p_id;
    end if;
end;
$$;

revoke execute on function public.track_visit(text, text, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.track_visit(text, text, text, text, jsonb) to service_role;
