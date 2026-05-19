import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "訪日レンタカー事業者向け チャット統合・予約管理システム",
  description:
    "LINE・WhatsApp・KakaoTalkなど複数チャネルからの問い合わせを統合し、予約情報・顧客情報・車両情報を一元管理するシステムを設計。多言語問い合わせ対応、予約管理、CRM連携までを見据えた、訪日レンタカー事業者向けのシステム開発実績。",
  alternates: { canonical: "/works/jamstec" },
  openGraph: {
    title: "訪日レンタカー事業者向け チャット統合・予約管理システム | Ligare（リガーレ）",
    description:
      "複数チャネルからの問い合わせを統合し、予約・顧客・車両を一元管理。訪日レンタカー事業者向けのチャット統合・予約管理システムを設計。",
    url: "/works/jamstec",
    type: "article"
  }
};

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/#works" className={styles.breadLink}>
            ← 実績一覧に戻る
          </Link>
        </nav>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Works · System Development / CRM</span>
          <h1 className={styles.title}>
            訪日レンタカー事業者向け
            <br />
            チャット統合・予約管理システム
          </h1>
          <p className={styles.subtitle}>
            LINE・WhatsApp・KakaoTalkなど複数チャネルからの問い合わせを統合し、予約情報・顧客情報・車両情報を一元管理するシステムを設計。多言語での問い合わせ対応、予約状況の管理、CRM連携までを見据え、現場オペレーションの効率化を支援しています。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/AI受託開発.png"
            alt="訪日レンタカー事業者向けチャット統合・予約管理システム概要"
            loading="lazy"
          />
        </div>

        <div className={styles.footer}>
          <Link href="/#works" className={styles.breadLink}>
            ← 実績一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
