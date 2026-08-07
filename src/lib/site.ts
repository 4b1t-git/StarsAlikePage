/** Canonical public URL of the site. Override per-environment with
 * NEXT_PUBLIC_SITE_URL (e.g. preview deploys). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://starsalike.app"
).replace(/\/$/, "");

export const SITE_NAME = "Stars Alike";

/** Google Play listing for the production Android application. */
export const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_PLAY_STORE_URL ??
  "https://play.google.com/store/apps/details?id=com.starsalike";
