import * as React from "react";
import { cn } from "../lib/cn";

export interface SectionHeadingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Center-align the heading block. */
  centered?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-3", centered && "items-center text-center", className)}
      {...props}
    >
      {eyebrow ? (
        <span className="font-mono text-xs uppercase tracking-widest text-accent">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="font-display text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.06] tracking-tight text-text">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-base leading-relaxed text-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}
