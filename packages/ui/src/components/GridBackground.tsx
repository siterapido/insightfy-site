import * as React from "react";
import { cn } from "../lib/cn";

export type GridBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * Decorative dot-matrix / grid background. Absolutely positioned, non-interactive.
 * Place inside a `relative` parent.
 */
export function GridBackground({ className, style, ...props }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          ...style,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(34,211,238,0.08), transparent 70%)",
        }}
      />
    </div>
  );
}
