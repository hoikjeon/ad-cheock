import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    try {
        const directoryPath = path.join(process.cwd(), 'public', 'images');

        // 디렉토리가 없으면 0개 반환 (에러 방지)
        if (!fs.existsSync(directoryPath)) {
            return NextResponse.json({ count: 0 });
        }

        const files = fs.readdirSync(directoryPath);

        // 정규식을 사용하여 slide1.jpg, slide2.jpg 형태의 파일 개수만 카운트
        let maxIndex = 0;
        files.forEach(file => {
            const match = file.match(/^slide(\d+)\.jpg$/i);
            if (match) {
                const num = parseInt(match[1]);
                if (num > maxIndex) {
                    maxIndex = num;
                }
            }
        });

        return NextResponse.json({ count: maxIndex });
    } catch (error) {
        console.error('API Error getting slide count:', error);
        return NextResponse.json({ count: 4 }, { status: 500 }); // 에러 시 기본값 4개 반환
    }
}
