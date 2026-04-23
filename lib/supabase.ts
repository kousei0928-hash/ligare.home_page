import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Activity = {
  id: string;
  title: string;
  description: string | null;
  date: string;
  image_path: string | null;
  external_url: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const STORAGE_BUCKET = "activities-images";

export function getImageUrl(path: string | null): string | null {
  if (!path) return null;
  const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
