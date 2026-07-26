import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase-admin";
import { DUMMY_PROJECTS, DUMMY_SKILLS } from "@/lib/dummy-data";

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request);
  if ("error" in admin) return admin.error;
  const supabaseAdmin = createSupabaseAdminClient();

  try {
    const [{ count: projectCount, error: projectError }, { count: skillCount, error: skillError }] =
      await Promise.all([
        supabaseAdmin.from("projects").select("*", { count: "exact", head: true }),
        supabaseAdmin.from("skills").select("*", { count: "exact", head: true }),
      ]);

    return NextResponse.json({
      projectCount: projectCount !== null && !projectError ? projectCount : DUMMY_PROJECTS.length,
      skillCount: skillCount !== null && !skillError ? skillCount : DUMMY_SKILLS.length,
    });
  } catch (err: any) {
    return NextResponse.json({
      projectCount: DUMMY_PROJECTS.length,
      skillCount: DUMMY_SKILLS.length,
    });
  }
}
