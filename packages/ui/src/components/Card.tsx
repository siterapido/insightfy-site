import * as React from "react";
import { cn } from "../lib/cn";

export type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border border-white/[0.06] bg-surface p-6 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-[border-color,box-shadow,transform] duration-300",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
