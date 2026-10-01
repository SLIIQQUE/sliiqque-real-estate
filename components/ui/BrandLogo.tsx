import Image from "next/image";

/** Sizes of the trimmed source files in public/brand (see scripts/make-logo-variants.mjs). */
const ASSETS = {
  product: { w: 530, h: 102, alt: "SLIIQQUE Product & Engineering" },
  icon: { w: 367, h: 227, alt: "SLIIQQUE" },
} as const;

interface Props {
  /** product: horizontal Product & Engineering lockup. icon: the QQ master mark. */
  variant: keyof typeof ASSETS;
  /** light = cream artwork for dark backgrounds; dark = black artwork for light backgrounds. */
  tone: "light" | "dark";
  /** Rendered width in px; height follows the aspect ratio. */
  width: number;
  priority?: boolean;
  className?: string;
}

export default function BrandLogo({
  variant,
  tone,
  width,
  priority,
  className,
}: Props) {
  const a = ASSETS[variant];
  return (
    <Image
      src={`/brand/${variant}-${tone}.png`}
      alt={a.alt}
      width={a.w}
      height={a.h}
      priority={priority}
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}
