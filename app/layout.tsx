import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: '연세척병원',
    description: '연세척병원 양방향 척추내시경',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className="font-sans">
            <body>{children}</body>
        </html>
    );
}
