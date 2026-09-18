"use client";
import type { PortfolioContent } from "@/lib/content-data";

export async function fetchPortfolioContent(
  signal?: AbortSignal,
): Promise<PortfolioContent | null> {
  const controller = new AbortController();
  const abort = () => controller.abort();
  if (signal?.aborted) return null;
  signal?.addEventListener("abort", abort, { once: true });
  const timeout = window.setTimeout(abort, 12000);
  try {
    const response = await fetch("/api/content", {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (
      !data ||
      !data.about ||
      !Array.isArray(data.projects) ||
      !Array.isArray(data.skills)
    )
      return null;
    return data as PortfolioContent;
  } catch {
    return null;
  } finally {
    window.clearTimeout(timeout);
    signal?.removeEventListener("abort", abort);
  }
}
