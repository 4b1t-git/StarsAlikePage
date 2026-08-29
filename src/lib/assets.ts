/** Path prefix applied when the site is served from a sub-directory, such as a
 * GitHub Pages project site. Empty string for root deployments.
 * Must match `basePath` in next.config.ts. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Resolve a file in `public/` to a URL that survives a sub-directory deploy.
 * Next.js prefixes `basePath` automatically for `next/link` and `next/image`,
 * but not for CSS `url()` values written by hand. */
export function asset(path: string): string {
  return `${BASE_PATH}${path}`;
}

/** CSS `background` shorthand for a note cover stored in `public/mockups`. */
export function mockupCover(file: string): string {
  return `url('${asset(`/mockups/${file}`)}') center/cover`;
}
