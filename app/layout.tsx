import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.ligare-hiroshima.jp";
const siteName = "リガーレ(Ligare)";
const description =
  "Ligare(リガーレ)は広島大学発のAI実装チームです。広島を拠点に、生成AI活用・AI受託開発・AI導入支援・AIを活用したWebアプリ開発を通じて、企業のAIネイティブ化を支援します。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "リガーレ(Ligare)｜広島大学発のAI実装チーム｜AI受託開発・AI導入支援",
    template: "%s | リガーレ(Ligare)"
  },
  description,
  keywords: [
    "広島 AI",
    "広島 AI開発",
    "広島 生成AI",
    "広島 AI導入支援",
    "広島 AI研修",
    "広島 Webアプリ開発",
    "AI受託開発",
    "AIネイティブ",
    "広島大学発",
    "AI実装チーム",
    "Ligare",
    "リガーレ"
  ],
  authors: [{ name: "リガーレ" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "リガーレ(Ligare)｜広島大学発のAI実装チーム",
    description,
    locale: "ja_JP",
    images: [
      {
        url: "/asetts/lt.png",
        width: 1200,
        height: 630,
        alt: "リガーレ(Ligare)ロゴ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "リガーレ(Ligare)｜広島大学発のAI実装チーム",
    description,
    images: ["/asetts/lt.png"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
