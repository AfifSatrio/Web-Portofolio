import { NextResponse } from "next/server";
import { getPortfolioContent } from "@/lib/content-data";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const content = await getPortfolioContent();
    return NextResponse.json(content, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Content is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
