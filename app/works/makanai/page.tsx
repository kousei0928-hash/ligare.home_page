import type { Metadata } from "next";
import Link from "next/link";
import styles from "../works.module.css";

export const metadata: Metadata = {
  title: "フードロス削減アプリ「まかない」",
  description:
    "大学食堂で発生する余剰食品を、学生が予約・購入できるWebアプリ「まかない」として開発。大学生協と連携し、アプリ開発・現場での受け渡し運用・改善まで一貫して実行。廃棄量は前年同月比で約50〜56%削減し、東広島市・学生発スタートアップチャレンジ2025でLTS賞を受賞。",
  alternates: { canonical: "/works/makanai" },
  openGraph: {
    title: "フードロス削減アプリ「まかない」 | Ligare（リガーレ）",
    description:
      "大学食堂のフードロスを削減するWebアプリ「まかない」。企画・開発・現場運用・成果創出までを一貫して実行し、廃棄量約50〜56%削減を達成。",
    url: "/works/makanai",
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
          <span className={styles.eyebrow}>Works · Web Application</span>
          <h1 className={styles.title}>フードロス削減アプリ「まかない」</h1>
          <p className={styles.subtitle}>
            大学食堂で発生する余剰食品を、学生が予約・購入できるWebアプリとして開発。
            大学生協と連携し、アプリ開発だけでなく、現場での受け渡し運用や改善まで行いました。
          </p>
        </header>

        {/* Section 1: アプリ開発と提供内容 */}
        <section className={styles.storyRow}>
          <div className={styles.storyItem}>
            <img
              src="/images/まかない概要.png"
              alt="まかないのアプリ画面とLINE告知"
              loading="lazy"
              className={styles.contain}
            />
            <h3>余剰食品を学生に届けるアプリを開発</h3>
            <p>
              大学食堂で発生する余剰食品を、学生がWebアプリから予約・購入できる仕組みを開発しました。LINEでの告知とWebアプリを連携し、在庫確認、購入、受け取りまでをスムーズにつなぐ導線を設計しています。
            </p>
          </div>
          <div className={styles.storyItem}>
            <img
              src="/images/弁当1卒論.jpg"
              alt="実際に提供されたまかない弁当"
              loading="lazy"
            />
            <h3>実際に提供されたまかない弁当</h3>
            <p>
              食堂で余ってしまう可能性のあるおかずを、お弁当として再構成し、学生に手頃な価格で提供しました。フードロス削減と学生の食費負担軽減の両立を目指した取り組みです。
            </p>
          </div>
        </section>

        {/* Section 2: 現場運用と成果 */}
        <section className={styles.storyRow}>
          <div className={styles.storyItem}>
            <img
              src="/images/弁当渡す卒論.jpg"
              alt="現場での弁当受け渡しの様子"
              loading="lazy"
            />
            <h3>現場での受け渡しまで運用</h3>
            <p>
              アプリを作るだけでなく、実際の食堂現場で受け渡しオペレーションも運用しました。大学生協や食堂スタッフと連携しながら、予約から受け渡しまでの流れを改善し、現場で回る仕組みとして定着させました。
            </p>
          </div>
          <div className={styles.storyItem}>
            <img
              src="/images/廃棄量比較.png"
              alt="2024年と2025年の月別廃棄量比較グラフ"
              loading="lazy"
              className={styles.contain}
            />
            <h3>廃棄量は前年同月比で約50〜56％削減</h3>
            <p>
              施策導入後、2025年の廃棄量は前年同月比で約50〜56％削減しました。余剰食品を学生に届ける仕組みを作ったことで、実際の廃棄量削減という成果につながっています。
            </p>
            <p className={styles.note}>
              10月：約49.8％削減 / 11月：約53.0％削減 / 12月：約55.8％削減
            </p>
          </div>
        </section>

        {/* Section 3: 受賞実績 */}
        <section className={`${styles.storyRow} ${styles.storyRowSolo}`}>
          <div className={styles.storyItem}>
            <img
              src="/images/LTS賞卒論.jpg"
              alt="LTS賞受賞の様子"
              loading="lazy"
            />
            <h3>東広島市・学生発スタートアップチャレンジ2025で受賞</h3>
            <p>
              本取り組みは、東広島市・学生発スタートアップチャレンジ2025において「LTS賞」を受賞しました。フードロス削減という成果だけでなく、広島県の人口流出という地域課題に対し、企業と学生をつなぐ仕組みづくりに取り組んだ点も評価されました。
            </p>
          </div>
        </section>

        <p className={styles.closing}>
          この取り組みを通じて、Ligareは企画・開発・現場運用・成果創出まで一貫して実行しました。
        </p>

        <div className={styles.footer}>
          <Link href="/#works" className={styles.breadLink}>
            ← 実績一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
