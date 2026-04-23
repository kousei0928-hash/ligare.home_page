"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, STORAGE_BUCKET, getImageUrl, type Activity } from "@/lib/supabase";
import styles from "./admin.module.css";

type FormState = {
  id?: string;
  title: string;
  description: string;
  date: string;
  image_path: string | null;
  external_url: string;
  published: boolean;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  date: new Date().toISOString().slice(0, 10),
  image_path: null,
  external_url: "",
  published: true
};

export default function AdminPage() {
  const router = useRouter();
  const [authReady, setAuthReady] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("activities")
      .select("*")
      .order("date", { ascending: false })
      .order("created_at", { ascending: false });

    if (fetchError) {
      setError("活動一覧の取得に失敗しました: " + fetchError.message);
    } else {
      setActivities(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      setUserEmail(session.user.email ?? null);
      setAuthReady(true);
      fetchActivities();
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router, fetchActivities]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  }

  function startNew() {
    setForm({ ...emptyForm });
    setError(null);
    setNotice(null);
  }

  function startEdit(activity: Activity) {
    setForm({
      id: activity.id,
      title: activity.title,
      description: activity.description ?? "",
      date: activity.date,
      image_path: activity.image_path,
      external_url: activity.external_url ?? "",
      published: activity.published
    });
    setError(null);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelForm() {
    setForm(null);
    setError(null);
  }

  async function handleImageUpload(file: File) {
    if (!form) return;
    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filename, file, { cacheControl: "3600", upsert: false });

    if (uploadError) {
      setError("画像アップロードに失敗: " + uploadError.message);
      setUploading(false);
      return;
    }

    setForm({ ...form, image_path: filename });
    setUploading(false);
  }

  async function handleImageRemove() {
    if (!form || !form.image_path) return;
    await supabase.storage.from(STORAGE_BUCKET).remove([form.image_path]);
    setForm({ ...form, image_path: null });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form) return;
    setSubmitting(true);
    setError(null);

    const payload = {
      title: form.title.trim(),
      description: form.description.trim() || null,
      date: form.date,
      image_path: form.image_path,
      external_url: form.external_url.trim() || null,
      published: form.published
    };

    if (form.id) {
      const { error: updateError } = await supabase
        .from("activities")
        .update(payload)
        .eq("id", form.id);
      if (updateError) {
        setError("更新に失敗: " + updateError.message);
        setSubmitting(false);
        return;
      }
      setNotice("更新しました");
    } else {
      const { error: insertError } = await supabase.from("activities").insert(payload);
      if (insertError) {
        setError("追加に失敗: " + insertError.message);
        setSubmitting(false);
        return;
      }
      setNotice("追加しました");
    }

    setForm(null);
    setSubmitting(false);
    await fetchActivities();
  }

  async function handleDelete(activity: Activity) {
    if (!confirm(`「${activity.title}」を削除しますか?`)) return;

    if (activity.image_path) {
      await supabase.storage.from(STORAGE_BUCKET).remove([activity.image_path]);
    }

    const { error: deleteError } = await supabase
      .from("activities")
      .delete()
      .eq("id", activity.id);

    if (deleteError) {
      setError("削除に失敗: " + deleteError.message);
      return;
    }
    setNotice("削除しました");
    await fetchActivities();
  }

  if (!authReady) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>リガーレ管理画面</div>
        <div className={styles.headerUser}>
          <span>{userEmail}</span>
          <button
            type="button"
            onClick={handleLogout}
            className={`${styles.button} ${styles.secondary}`}
            style={{ padding: "0.35rem 0.8rem" }}
          >
            ログアウト
          </button>
        </div>
      </header>

      <main className={styles.container}>
        {error && <div className={styles.error}>{error}</div>}
        {notice && <div className={styles.success}>{notice}</div>}

        <div className={styles.sectionTitle}>
          <span>活動(Activities)</span>
          {!form && (
            <button
              type="button"
              onClick={startNew}
              className={`${styles.button} ${styles.primary}`}
            >
              + 新規追加
            </button>
          )}
        </div>

        {form && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <label className={styles.label}>タイトル</label>
              <input
                className={styles.input}
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                maxLength={100}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>日付</label>
              <input
                type="date"
                className={styles.input}
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>画像</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                disabled={uploading}
              />
              {uploading && <div style={{ marginTop: "0.5rem", color: "#6b7280" }}>アップロード中...</div>}
              {form.image_path && (
                <div>
                  <img
                    src={getImageUrl(form.image_path) ?? ""}
                    alt="プレビュー"
                    className={styles.thumbPreview}
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className={`${styles.button} ${styles.ghostDanger}`}
                    style={{ marginTop: "0.5rem", padding: "0.3rem 0.7rem", fontSize: "0.8rem" }}
                  >
                    画像を削除
                  </button>
                </div>
              )}
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>本文</label>
              <textarea
                className={styles.textarea}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                maxLength={500}
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.label}>外部リンク (任意)</label>
              <input
                type="url"
                className={styles.input}
                value={form.external_url}
                onChange={(e) => setForm({ ...form, external_url: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className={styles.formRow}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                />
                公開する(オフにすると下書き扱いでサイトに表示されません)
              </label>
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={cancelForm}
                className={`${styles.button} ${styles.secondary}`}
                disabled={submitting}
              >
                キャンセル
              </button>
              <button
                type="submit"
                className={`${styles.button} ${styles.primary}`}
                disabled={submitting || uploading}
              >
                {submitting ? "保存中..." : form.id ? "更新する" : "追加する"}
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className={styles.loading}>読み込み中...</div>
        ) : activities.length === 0 ? (
          <div className={styles.empty}>まだ活動が登録されていません</div>
        ) : (
          <div className={styles.list}>
            {activities.map((a) => {
              const imgUrl = getImageUrl(a.image_path);
              return (
                <div key={a.id} className={styles.card}>
                  {imgUrl ? (
                    <img src={imgUrl} alt="" className={styles.cardThumb} />
                  ) : (
                    <div className={styles.cardThumb} />
                  )}
                  <div className={styles.cardBody}>
                    <div className={styles.cardTitle}>
                      {a.title}
                      <span
                        className={`${styles.badge} ${
                          a.published ? styles.badgePublished : styles.badgeDraft
                        }`}
                      >
                        {a.published ? "公開中" : "下書き"}
                      </span>
                    </div>
                    <div className={styles.cardDate}>
                      {a.date.replaceAll("-", ".")}
                    </div>
                    {a.description && <div className={styles.cardDesc}>{a.description}</div>}
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      onClick={() => startEdit(a)}
                      className={`${styles.button} ${styles.secondary}`}
                    >
                      編集
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(a)}
                      className={`${styles.button} ${styles.danger}`}
                    >
                      削除
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
