/**
 * Checks if the given email is present in the ADMIN_WHITELIST_EMAILS environment variable.
 * @param email Email address to verify
 */
export function isEmailWhitelisted(email: string | null | undefined): boolean {
  if (!email) return false;
  
  const whitelistString = process.env.ADMIN_WHITELIST_EMAILS || "";
  const whitelistedEmails = whitelistString
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return whitelistedEmails.includes(email.trim().toLowerCase());
}
