import { auth } from "@/lib/firebase";

export async function adminFetch<T>(input: string, init: RequestInit = {}): Promise<T> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("Sesi admin belum tersedia. Silakan login ulang.");
  }

  const token = await user.getIdToken();
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);

  if (init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(payload?.error || "Admin request failed.");
  }

  if (response.status === 204) {
    return null as T;
  }

  return (await response.json()) as T;
}
