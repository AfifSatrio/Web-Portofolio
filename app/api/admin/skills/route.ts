import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

import {
  SKILL_CATEGORIES as ALLOWED_CATEGORIES,
  normalizeSkills,
} from "@/lib/profile-content";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("skills")
      .select("*")
      .order("category");

    if (error) {
      console.warn(
        "Supabase skills table not ready yet, using fallback data:",
        error.message,
      );
      return NextResponse.json({ skills: [] });
    }

    return NextResponse.json({ skills: normalizeSkills(data || []) });
  } catch (err: any) {
    return NextResponse.json({ skills: [] });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  const payload = await request.json();
  if (!ALLOWED_CATEGORIES.includes(payload?.category)) {
    return NextResponse.json(
      { error: "Kategori skill tidak valid." },
      { status: 400 },
    );
  }

  const { data, error } = await supabaseAdmin
    .from("skills")
    .insert([payload])
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ skill: data }, { status: 201 });
}
