import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.warn("Supabase projects table not ready yet, using fallback data:", error.message);
      return NextResponse.json({ projects: [] });
    }

    return NextResponse.json({ projects: data && data.length > 0 ? data : [] });
  } catch (err: any) {
    return NextResponse.json({ projects: [] });
  }
}

export async function POST(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  const payload = await request.json();
  const { data, error } = await supabaseAdmin.from("projects").insert([payload]).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ project: data }, { status: 201 });
}
