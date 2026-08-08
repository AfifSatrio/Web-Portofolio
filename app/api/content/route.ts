import { NextResponse } from "next/server";
import { getPortfolioContent } from "@/lib/content-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getPortfolioContent();

  return NextResponse.json(content, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
