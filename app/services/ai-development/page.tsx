import type { Metadata } from "next";
import Link from "next/link";
import styles from "../services.module.css";

export const metadata: Metadata = {
  title: "AI受託開発・AI導入支援",
  description:
    "Ligare（広島大学発のAI実装チーム）のAI受託開発・AI導入支援。生成AI・機械学習・RAGを活用し、課題整理から要件定義、プロトタイプ開発、運用改善まで一貫して伴走します。",
  alternates: { canonical: "/services/ai-development" },
  openGraph: {
    title: "AI受託開発・AI導入支援 | Ligare（リガーレ）",
    description:
      "Ligare（広島大学発のAI実装チーム）のAI受託開発・AI導入支援。生成AI・機械学習・RAGを活用し、課題整理から運用改善まで一貫して伴走。",
    url: "/services/ai-development",
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
          <h1 className={styles.title}>AI受託開発・AI導入支援</h1>
          <p className={styles.subtitle}>
            生成AI・機械学習・RAGを活用し、企業の業務効率化やナレッジ活用を支援します。課題整理から要件定義、プロトタイプ開発、運用改善まで一貫して伴走します。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/AI受託開発.png"
            alt="AI受託開発のサービス内容"
            loading="lazy"
          />
          <img
            className={styles.image}
            src="/images/開発実績.png"
            alt="AI受託開発の開発実績"
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
