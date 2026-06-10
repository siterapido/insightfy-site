import * as React from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "secondary";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  /** Render the single child element instead of a <button> (e.g. for links). */
  asChild?: boolean;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium tracking-tight transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-white text-black shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset] hover:bg-white/92 hover:shadow-[0_0_24px_-4px_rgba(255,255,255,0.15)] active:scale-[0.98]",
  secondary:
    "border border-white/[0.08] bg-surface text-text hover:border-white/[0.14] hover:bg-white/[0.04] active:scale-[0.98]",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, children, ...props }, ref) => {
    const classes = cn(base, variants[variant], className);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<{ className?: string }>;
      return React.cloneElement(child, {
        className: cn(classes, child.props.className),
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
