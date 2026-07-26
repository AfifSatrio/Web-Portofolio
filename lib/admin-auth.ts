import { NextRequest, NextResponse } from "next/server";

interface FirebaseLookupResponse {
  users?: Array<{
    email?: string;
  }>;
  error?: {
    message?: string;
  };
}

function getWhitelistedEmails() {
  return (process.env.ADMIN_WHITELIST_EMAILS || process.env.NEXT_PUBLIC_ADMIN_WHITELIST_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;

  if (!token) {
    return {
      error: NextResponse.json({ error: "Missing Firebase ID token." }, { status: 401 }),
    };
  }

  const firebaseApiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  if (!firebaseApiKey) {
    return {
      error: NextResponse.json({ error: "Firebase API key is not configured." }, { status: 500 }),
    };
  }

  let response: Response;
  let payload: FirebaseLookupResponse;

  try {
    response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
        cache: "no-store",
      }
    );
    payload = (await response.json()) as FirebaseLookupResponse;
  } catch (err) {
    return {
      error: NextResponse.json(
        { error: "Gagal memverifikasi sesi Firebase dari server." },
        { status: 502 }
      ),
    };
  }

  const email = payload.users?.[0]?.email?.toLowerCase();

  if (!response.ok || !email) {
    return {
      error: NextResponse.json({ error: "Invalid Firebase session." }, { status: 401 }),
    };
  }

  if (!getWhitelistedEmails().includes(email)) {
    return {
      error: NextResponse.json({ error: "Email is not whitelisted for admin access." }, { status: 403 }),
    };
  }

  return { email };
}
