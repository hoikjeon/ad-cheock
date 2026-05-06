import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, phone, memo } = body;

        const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

        if (!slackWebhookUrl) {
            return NextResponse.json({ error: 'Slack webhook URL not configured' }, { status: 500 });
        }

        const kstTime = new Intl.DateTimeFormat('ko-KR', {
            timeZone: 'Asia/Seoul',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }).format(new Date());

        const slackMessage = {
            text: "🔔 *새로운 빠른 상담 신청이 접수되었습니다!*",
            blocks: [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: "🔔 새로운 상담 신청",
                        emoji: true
                    }
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*환자 성함:*\n${name}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*연락처:*\n${phone}`
                        }
                    ]
                },
                {
                    type: "section",
                    fields: [
                        {
                            type: "mrkdwn",
                            text: `*증상 및 문의내용:*\n${memo || "없음"}`
                        },
                        {
                            type: "mrkdwn",
                            text: `*접수 일시:*\n${kstTime}`
                        }
                    ]
                }
            ]
        };

        const response = await fetch(slackWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(slackMessage),
        });

        if (!response.ok) {
            throw new Error(`Slack API error: ${response.status}`);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Slack notification error:', error);
        return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }
}
