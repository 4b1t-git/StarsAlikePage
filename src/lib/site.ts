/** Canonical public URL of the site, used for metadata, sitemap and robots.
 * Defaults to the production GitHub Pages address so local builds emit real
 * URLs. Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. a custom
 * domain or a preview deploy). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://4b1t-git.github.io/StarsAlikePage"
).replace(/\/$/, "");

export const SITE_NAME = "Stars Alike";

/** Google Play listing for the production Android application. */
export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
  "https://play.google.com/store/apps/details?id=com.starsalike";
