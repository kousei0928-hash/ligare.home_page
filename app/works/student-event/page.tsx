import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "学生×企業イベント",
  description:
    "企業と学生の接点づくりを目的に、就活イベント・AIセミナー・地域共創企画を設計から運営まで支援しています。企業の魅力を学生に届ける場づくりを伴走します。",
  alternates: { canonical: "/works/student-event" },
  openGraph: {
    title: "学生×企業イベント | Ligare（リガーレ）",
    description:
      "学生ネットワークを活かし、就活イベント・AIセミナー・地域共創企画を設計から運営まで支援。",
    url: "/works/student-event",
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
          <span className={styles.eyebrow}>Works · Community / Event</span>
          <h1 className={styles.title}>学生×企業イベント</h1>
          <p className={styles.subtitle}>
            企業と学生の接点づくりを目的に、就活イベント・AIセミナー・地域共創企画を設計から運営まで支援しています。企業の魅力を学生に届ける場づくりを、企画から集客、当日の運営まで伴走します。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/学生×企業イベント.png"
            alt="学生×企業イベントの概要"
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
