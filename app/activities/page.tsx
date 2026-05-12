import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import type { Activity } from "@/lib/supabase";
import styles from "./activities.module.css";

export const metadata: Metadata = {
  title: "活動一覧 | リガーレ(Ligare)",
  description:
    "リガーレ(Ligare)の全活動一覧。広島大学発のAI実装チームとしての受賞歴、企業・大学とのコラボレーション、AIセミナーやイベント開催など、これまでの取り組みをまとめています。",
  alternates: { canonical: "/activities" },
  openGraph: {
    title: "活動一覧 | リガーレ(Ligare)",
    description: "広島大学発のAI実装チームLigareの全活動一覧。受賞歴、コラボ、AIセミナーなどの取り組みを掲載。",
    url: "/activities",
    type: "website"
  }
};

export const revalidate = 60;

const STORAGE_BUCKET = "activities-images";

function getImageUrl(supabaseUrl: string, path: string | null): string | null {
  if (!path) return null;
  const encoded = path.split("/").map(encodeURIComponent).join("/");
  return `${supabaseUrl}/storage/v1/object/public/${STORAGE_BUCKET}/${encoded}`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "";
  const y = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const da = String(d.getDate()).padStart(2, "0");
  return `${y}.${mo}.${da}`;
}

async function getActivities(): Promise<Activity[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  const client = createClient(url, key);
  const { data, error } = await client
    .from("activities")
    .select("*")
    .eq("published", true)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch activities:", error);
    return [];
  }
  return (data as Activity[]) ?? [];
}

export default async function ActivitiesPage() {
  const activities = await getActivities();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.breadLink}>
            ← ホームに戻る
          </Link>
        </nav>

        <header className={styles.header}>
          <h1 className={styles.title}>
            <span className={styles.titleEn}>Activities</span>
            <span className={styles.titleJa}>活動一覧</span>
          </h1>
          <p className={styles.subtitle}>
            リガーレ(Ligare)のこれまでの取り組みをご覧いただけます。
          </p>
        </header>

        {activities.length === 0 ? (
          <div className={styles.empty}>
            現在、公開されている活動はありません。
          </div>
        ) : (
          <ul className={styles.list}>
            {activities.map((a) => {
              const img = getImageUrl(supabaseUrl, a.image_path);
              const dateText = formatDate(a.date);
              const content = (
                <>
                  {img ? (
                    <img
                      src={img}
                      alt={a.title}
                      loading="lazy"
                      className={styles.thumb}
                    />
                  ) : (
                    <div className={styles.thumbPlaceholder} aria-hidden="true" />
                  )}
                  <div className={styles.body}>
                    {dateText && (
                      <time dateTime={a.date} className={styles.date}>
                        {dateText}
                      </time>
                    )}
                    <h2 className={styles.itemTitle}>{a.title}</h2>
                    {a.description && (
                      <p className={styles.description}>{a.description}</p>
                    )}
                    {a.external_url && (
                      <span className={styles.detailButton}>詳細を見る →</span>
                    )}
                  </div>
                </>
              );

              return (
                <li key={a.id} className={styles.item}>
                  {a.external_url ? (
                    <a
                      href={a.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.itemLink}
                      aria-label={`${a.title} の詳細を見る`}
                    >
                      {content}
                    </a>
                  ) : (
                    <div className={styles.itemStatic}>{content}</div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
