import type { ReactNode } from "react";

/** Eyebrow + serif title + optional intro, used at the top of every inner page. */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 max-w-[760px]">
      <div className="text-[11px] tracking-[0.2em] uppercase text-[#C26A4A] mb-3">
        {eyebrow}
      </div>
      <h1 className="serif text-[34px] lg:text-[52px] leading-[0.98] tracking-tight">
        {title}
      </h1>
      {intro && (
        <p className="mt-4 text-[15px] leading-[1.7] text-[#6B6B6B] max-w-[620px]">
          {intro}
        </p>
      )}
      {children}
    </header>
  );
}
