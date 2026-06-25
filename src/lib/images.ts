/** Default Next.js image encoder quality (default is 75). */
export const IMAGE_QUALITY = 90;

/** WebP export quality for `scripts/convert-images.mjs`. */
export const WEBP_QUALITY = 90;

export function isLocalSiteImage(src: unknown): boolean {
  return typeof src === "string" && src.startsWith("/images/");
}
