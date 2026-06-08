/**
 * Logo — Insightfy wordmark + inline SVG mark (cyan).
 * STABLE: exported as `Logo`. Accepts standard span props for sizing/spacing.
 */
import * as React from "react";
import { cn } from "@insightfy/ui";

export type LogoProps = React.HTMLAttributes<HTMLSpanElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} {...props}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-accent"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M7 15.5 10.5 8l3 5 1.5-2.5L17 15.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-lg font-bold tracking-tight text-text">Insightfy</span>
    </span>
  );
}
