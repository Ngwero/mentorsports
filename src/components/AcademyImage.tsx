import Image, { type ImageProps } from "next/image";
import { IMAGE_QUALITY, isLocalSiteImage } from "@/lib/images";

/**
 * Serves pre-optimized files from /public/images without re-encoding.
 * Remote images still go through the Next.js optimizer at high quality.
 */
export default function AcademyImage({
  quality = IMAGE_QUALITY,
  unoptimized,
  src,
  ...props
}: ImageProps) {
  const preserveSource = unoptimized ?? isLocalSiteImage(src);

  return (
    <Image
      src={src}
      quality={quality}
      unoptimized={preserveSource}
      {...props}
    />
  );
}
