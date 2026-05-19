import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  company?: string;
  name?: string;
  email?: string;
  topic?: string;
  message?: string;
};

const MAX_COMPANY_LENGTH = 120;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 120;
const MAX_TOPIC_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 3000;

const sanitize = (value: unknown, maxLength: number): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const isEmail = (value: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export async function POST(request: Request) {
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!slackWebhookUrl) {
    return NextResponse.json(
      { message: "Server notification configuration is missing." },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const company = sanitize(body.company, MAX_COMPANY_LENGTH);
  const name = sanitize(body.name, MAX_NAME_LENGTH);
  const email = sanitize(body.email, MAX_EMAIL_LENGTH);
  const topic = sanitize(body.topic, MAX_TOPIC_LENGTH);
  const message = sanitize(body.message, MAX_MESSAGE_LENGTH);

  if (!name || !email || !topic || !message) {
    return NextResponse.json(
      { message: "Required fields are missing." },
      { status: 400 }
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { message: "Email format is invalid." },
      { status: 400 }
    );
  }

  const submittedAt = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  const slackText = [
    "📩 *Ligare お問い合わせ通知*",
    `送信日時: ${submittedAt}`,
    `会社名: ${company || "(未入力)"}`,
    `名前: ${name}`,
    `メールアドレス: ${email}`,
    `相談内容: ${topic}`,
    "メッセージ:",
    message,
  ].join("\n");

  try {
    const slackResponse = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: slackText,
      }),
    });

    if (!slackResponse.ok) {
      throw new Error(`Failed to send Slack notification: ${slackResponse.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to process contact request:", error);
    return NextResponse.json(
      { message: "Failed to send message." },
      { status: 500 }
    );
  }
}
