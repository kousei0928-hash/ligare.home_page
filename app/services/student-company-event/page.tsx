import type { Metadata } from "next";
import Link from "next/link";
import styles from "../services.module.css";

export const metadata: Metadata = {
  title: "学生×企業共創",
  description:
    "Ligare（広島大学発のAI実装チーム）の学生×企業共創。広島大学を中心とした学生ネットワークを活かし、就活イベント・AIセミナー・共創企画を設計から運営まで支援します。",
  alternates: { canonical: "/services/student-company-event" },
  openGraph: {
    title: "学生×企業共創 | Ligare（リガーレ）",
    description:
      "学生ネットワークを活かし、企業と学生がつながる就活イベント・AIセミナー・共創企画を設計から運営まで支援。",
    url: "/services/student-company-event",
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
          <h1 className={styles.title}>学生×企業共創</h1>
          <p className={styles.subtitle}>
            広島大学を中心とした学生ネットワークを活かし、企業と学生がつながる就活イベント・AIセミナー・共創企画を設計から運営まで支援します。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/学生×企業イベント.png"
            alt="学生×企業イベントの様子"
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
