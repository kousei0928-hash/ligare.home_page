import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "機械学習による自動菌体検出・計数システム",
  description:
    "JAMSTEC高知コア研究所との共同研究を通じて、機械学習を用いた自動菌体検出・計数システムを開発しました。研究現場での分析作業を効率化する取り組みであり、掘削船「ちきゅう」への搭載も予定されています。",
  alternates: { canonical: "/works/jamstec" },
  openGraph: {
    title: "機械学習による自動菌体検出・計数システム | Ligare（リガーレ）",
    description:
      "JAMSTEC高知コア研究所との共同研究。機械学習による菌体の自動検出・計数を実現し、掘削船「ちきゅう」への搭載も予定。",
    url: "/works/jamstec",
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
          <span className={styles.eyebrow}>Works · AI / Machine Learning</span>
          <h1 className={styles.title}>機械学習による自動菌体検出・計数システム</h1>
          <p className={styles.subtitle}>
            JAMSTEC高知コア研究所との共同研究を通じて、機械学習を用いた自動菌体検出・計数システムを開発しました。研究現場での分析作業を効率化する取り組みであり、掘削船「ちきゅう」への搭載も予定されています。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/AI受託開発.png"
            alt="機械学習による自動菌体検出・計数システムの概要"
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
