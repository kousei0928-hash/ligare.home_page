import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "研究室ホームページ制作",
  description:
    "研究室や教育機関向けに、活動内容・研究内容・メンバー情報を分かりやすく発信するホームページを制作。情報設計からデザイン、実装、公開まで一貫して対応します。",
  alternates: { canonical: "/works/lab-homepage" },
  openGraph: {
    title: "研究室ホームページ制作 | Ligare（リガーレ）",
    description:
      "研究室や教育機関向けに、情報設計からデザイン、実装、公開まで一貫して対応したホームページ制作の実績。",
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
          <h1 className={styles.title}>研究室ホームページ制作</h1>
          <p className={styles.subtitle}>
            研究室や教育機関向けに、活動内容・研究内容・メンバー情報を分かりやすく発信するホームページを制作しました。情報設計からデザイン、実装、公開まで一貫して対応し、研究活動の魅力が伝わるWebサイトを構築しました。
          </p>
        </header>

        <div className={styles.imageStack}>
          <img
            className={styles.image}
            src="/images/HP導入例.png"
            alt="研究室ホームページの導入例"
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
