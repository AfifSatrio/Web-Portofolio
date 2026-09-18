import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import {
  PROFILE_ABOUT as EMPTY_ABOUT,
  normalizeAbout,
} from "@/lib/profile-content";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("about_content")
      .select("*")
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn(
        "Supabase about_content table not ready yet, using fallback data:",
        error.message,
      );
      return NextResponse.json({ about: EMPTY_ABOUT });
    }

    return NextResponse.json({ about: normalizeAbout(data) });
  } catch (err: any) {
    return NextResponse.json({ about: EMPTY_ABOUT });
  }
}

export async function PUT(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  const payload = normalizeAbout(await request.json());
  const { data, error } = await supabaseAdmin
    .from("about_content")
    .upsert([payload])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ about: data });
}
