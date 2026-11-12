import { createHash, createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

// 관리자 로그인: 환경변수 ADMIN_PASSWORD 하나로 확인하고, 서명된 쿠키로 7일간 유지합니다.
// 비밀번호를 바꾸면 기존 로그인 쿠키는 모두 무효가 됩니다.
export const ADMIN_COOKIE = 'yc_admin';
export const ADMIN_MAX_AGE = 60 * 60 * 24 * 7;

function password() {
    return process.env.ADMIN_PASSWORD || '';
}

function sign(value: string) {
    return createHmac('sha256', `yc-admin:${password()}`).update(value).digest('hex');
}

function safeEqual(a: string, b: string) {
    const ha = createHash('sha256').update(a).digest();
    const hb = createHash('sha256').update(b).digest();
    return timingSafeEqual(ha, hb);
}

export function checkPassword(input: string) {
    return password().length > 0 && safeEqual(input, password());
}

export function createSessionToken() {
    const expires = String(Date.now() + ADMIN_MAX_AGE * 1000);
    return `${expires}.${sign(expires)}`;
}

export function verifySessionToken(token: string | undefined) {
    if (!token || !password()) return false;
    const [expires, signature] = token.split('.');
    if (!expires || !signature || Number(expires) < Date.now()) return false;
    return safeEqual(signature, sign(expires));
}

export function isAdminRequest() {
    return verifySessionToken(cookies().get(ADMIN_COOKIE)?.value);
}
