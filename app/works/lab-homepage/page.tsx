import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "ホームページ制作",
  description:
    "企業・ホテル・店舗・研究室・教育機関など業種を問わず、情報を分かりやすく発信するホームページを制作。情報設計からデザイン、実装、公開まで一貫対応し、安定した開発体制のもとで短期間・高品質な納品を実現します。",
  alternates: { canonical: "/works/lab-homepage" },
  openGraph: {
    title: "ホームページ制作 | Ligare（リガーレ）",
    description:
      "企業・ホテル・店舗・研究室など幅広い業種のホームページを制作。情報設計からデザイン、実装、公開まで一貫対応。安定した開発体制で、短期間・高品質な納品を実現します。",
    url: "/works/lab-homepage",
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
          <span className={styles.eyebrow}>Works · Homepage</span>
          <h1 className={styles.title}>ホームページ制作</h1>
          <p className={styles.subtitle}>
            企業・ホテル・店舗・研究室・教育機関など、業種を問わず情報を分かりやすく発信するホームページを制作します。情報設計からデザイン、実装、公開まで一貫して対応。<strong>安定した開発体制のもと、短期間かつ高品質な納品が可能</strong>です。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/HP導入例.png"
            alt="ホームページ制作の導入例"
            loading="lazy"
          />
          <img
            className={styles.image}
            src="/images/開発体制.png"
            alt="安定した開発体制と短期間納品を実現する体制図"
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
