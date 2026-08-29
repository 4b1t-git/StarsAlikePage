import type { NextConfig } from "next";

/** Sub-directory the site is served from, e.g. "/StarsAlikePage" on a GitHub
 * Pages project site. Empty locally and on root deployments. Kept in sync with
 * `BASE_PATH` in src/lib/assets.ts through the same env var. */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files: emit a fully static site into `out/`.
  output: "export",
  basePath,
  // Emit `privacidad/index.html` instead of `privacidad.html` so the route
  // resolves without server-side extension rewriting.
  trailingSlash: true,
  // The on-demand optimizer needs a Node server, which Pages does not provide.
  images: { unoptimized: true },
};

export default nextConfig;
