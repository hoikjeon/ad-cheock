import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, ADMIN_MAX_AGE, checkPassword, createSessionToken } from '../../../lib/adminAuth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const input = typeof body?.password === 'string' ? body.password : '';

    if (!process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: '관리자 비밀번호가 설정되지 않았습니다.' }, { status: 500 });
    }
    if (!checkPassword(input)) {
        // 무작위 대입을 늦추기 위해 실패 응답을 잠시 지연합니다.
        await new Promise((resolve) => setTimeout(resolve, 800));
        return NextResponse.json({ error: '비밀번호가 맞지 않습니다.' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(ADMIN_COOKIE, createSessionToken(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: ADMIN_MAX_AGE,
    });
    return response;
}
