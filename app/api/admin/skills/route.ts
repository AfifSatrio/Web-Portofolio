import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { DUMMY_SKILLS } from "@/lib/dummy-data";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin.from("skills").select("*").order("category");

    if (error) {
      console.warn("Supabase skills table not ready yet, using fallback data:", error.message);
      return NextResponse.json({ skills: DUMMY_SKILLS });
    }

    return NextResponse.json({ skills: data && data.length > 0 ? data : DUMMY_SKILLS });
  } catch (err: any) {
    return NextResponse.json({ skills: DUMMY_SKILLS });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  const payload = await request.json();
  const { data, error } = await supabaseAdmin.from("skills").insert([payload]).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ skill: data }, { status: 201 });
}
