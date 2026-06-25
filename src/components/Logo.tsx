import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  showText?: boolean;
  height?: number;
}

export default function Logo({ showText = true, height = 48 }: LogoProps) {
  const width = Math.round(height * (1000 / 434));

  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0">
      <Image
        src="/logo.png"
        alt="Mentor Sports International Academy"
        width={width}
        height={height}
        className="object-contain group-hover:scale-110 transition-transform duration-300"
        priority
      />
      {showText && (
        <div className="hidden sm:block">
          <p className="font-bold text-sm md:text-base leading-tight tracking-wide uppercase text-ms-text">
            Mentor Sports
          </p>
          <p className="text-[10px] md:text-xs text-ms-text-muted tracking-widest uppercase">
            International Academy
          </p>
        </div>
      )}
    </Link>
  );
}
