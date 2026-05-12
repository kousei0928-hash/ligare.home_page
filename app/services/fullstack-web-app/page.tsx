import type { Metadata } from "next";
import Link from "next/link";
import styles from "../services.module.css";

export const metadata: Metadata = {
  title: "AI×フルスタックWebアプリ開発",
  description:
    "Ligare（広島大学発のAI実装チーム）のAI×フルスタックWebアプリ開発。企画・UI/UX設計・フロントエンド・バックエンド・インフラまで一気通貫で開発します。",
  alternates: { canonical: "/services/fullstack-web-app" },
  openGraph: {
    title: "AI×フルスタックWebアプリ開発 | Ligare（リガーレ）",
    description:
      "AIを活用したWebアプリや業務システムを、企画から運用まで一気通貫で開発します。",
    url: "/services/fullstack-web-app",
    type: "article"
  }
};

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>
            ← トップへ戻る
          </Link>
        </nav>

        <header className={styles.header}>
          <span className={styles.eyebrow}>Services</span>
          <h1 className={styles.title}>AI×フルスタックWebアプリ開発</h1>
          <p className={styles.subtitle}>
            AIを活用したWebアプリや業務システムを、企画・UI/UX設計・フロントエンド・バックエンド・インフラまで一気通貫で開発します。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/Webアプリ開発.png"
            alt="AI×フルスタックWebアプリ開発のサービス内容"
            loading="lazy"
          />
          <img
            className={styles.image}
            src="/images/開発体制.png"
            alt="Webアプリ開発の開発体制"
            loading="lazy"
          />
        </div>

        <div className={styles.footer}>
          <Link href="/" className={styles.breadLink}>
            ← トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
