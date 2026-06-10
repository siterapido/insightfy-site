/**
 * Logo — Insightfy wordmark + inline SVG mark (cyan).
 * STABLE: exported as `Logo`. Accepts standard span props for sizing/spacing.
 */
import * as React from "react";
import { cn } from "@insightfy/ui";

export type LogoProps = React.HTMLAttributes<HTMLSpanElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span
      className={cn("group inline-flex select-none items-center gap-2", className)}
      {...props}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 text-accent"
      >
        <rect
          x="2.25"
          y="2.25"
          width="19.5"
          height="19.5"
          rx="5.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="opacity-70"
        />
        {/* stylized insight glyph: brackets framing a rising spark */}
        <path
          d="M8.5 7.5 6 12l2.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 7.5 18 12l-2.5 4.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 14.5 12 9l1.5 3 .9-1.6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-display text-lg font-bold tracking-tight text-text">
        Insightfy
      </span>
    </span>
  );
}
