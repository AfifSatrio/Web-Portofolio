import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const [{ count: projectCount, error: projectError }, { count: skillCount, error: skillError }] =
      await Promise.all([
        supabaseAdmin.from("projects").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("skills").select("*", { count: "exact", head: true }).neq("category", "Soft Skills"),
      ]);

    return NextResponse.json({
      projectCount: projectCount !== null && !projectError ? projectCount : 0,
      skillCount: skillCount !== null && !skillError ? skillCount : 0,
    });
  } catch (err: any) {
    return NextResponse.json({
      projectCount: 0,
      skillCount: 0,
    });
  }
}
