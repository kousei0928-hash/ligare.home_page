import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "フードロス削減アプリ「まかない」",
  description:
    "大学食堂で発生する余剰食品を、学生が予約・購入できるWebアプリ「まかない」として実装。LINEログインや受け取り管理まで含め、大学食堂の現場で実際に使われる仕組みを構築しました。",
  alternates: { canonical: "/works/makanai" },
  openGraph: {
    title: "フードロス削減アプリ「まかない」 | Ligare（リガーレ）",
    description:
      "大学食堂のフードロスを削減するWebアプリ「まかない」。学生が予約・購入できるWebアプリとして実装し、食堂運営のDXを支援。",
    url: "/works/makanai",
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
          <span className={styles.eyebrow}>Works · Web Application</span>
          <h1 className={styles.title}>フードロス削減アプリ「まかない」</h1>
          <p className={styles.subtitle}>
            大学食堂で発生する余剰食品を、学生が予約・購入できるWebアプリとして実装しました。LINEログインや受け取り管理まで含め、大学食堂の現場で実際に使われる仕組みを構築し、食堂運営のDXを支援しました。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/まかない概要.png"
            alt="フードロス削減アプリ「まかない」の概要"
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
