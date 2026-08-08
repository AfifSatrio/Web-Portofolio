"use client";

import type { PortfolioContent } from "@/lib/content-data";

export async function fetchPortfolioContent(): Promise<PortfolioContent | null> {
  try {
    const response = await fetch("/api/content", { cache: "no-store" });

    if (!response.ok) return null;
    return (await response.json()) as PortfolioContent;
  } catch {
    return null;
  }
}
