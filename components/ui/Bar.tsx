import type { ReactNode } from "react";

/**
 * Skeleton placeholder that reserves the exact space of real text: it wraps
 * dummy content in the same typography classes, so line-height and width
 * come from the real layout instead of guessed pixel values.
 */
export default function Bar({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`inline-block rounded-md bg-[#EFE7DB] text-transparent select-none animate-pulse ${className}`}
    >
      {children}
    </span>
  );
}
