import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Safe query helper that returns null if Supabase query fails
 * (e.g. when database tables are not initialized yet).
 */
export async function safeQuery<T>(
  queryFn: (client: typeof supabase) => Promise<any> | any
): Promise<T | null> {
  try {
    const res = await queryFn(supabase);
    if (!res || res.error) return null;
    return res.data as T;
  } catch {
    return null;
  }
}
