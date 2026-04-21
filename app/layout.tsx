import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://www.ligare-hiroshima.jp";
const siteName = "リガーレ(Ligare)";
const description =
  "リガーレ(Ligare)は広島大学発の学生スタートアップ。広島を拠点にDX支援、フードロス削減アプリ、JA全農広島との共創事業を展開し、人・サービス・経験・価値をつなぎます。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "リガーレ(Ligare)| 広島大学発スタートアップ - DX・フードロス・共創事業",
    template: "%s | リガーレ(Ligare)"
  },
  description,
  keywords: [
    "リガーレ",
    "Ligare",
    "ligare",
    "りがーれ",
    "広島大学",
    "広島 スタートアップ",
    "学生スタートアップ",
    "DX 広島",
    "フードロス 広島",
    "JA全農広島",
    "広島 マルシェ"
  ],
  authors: [{ name: "リガーレ" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "リガーレ(Ligare)| 広島大学発スタートアップ",
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
    title: "リガーレ(Ligare)| 広島大学発スタートアップ",
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
