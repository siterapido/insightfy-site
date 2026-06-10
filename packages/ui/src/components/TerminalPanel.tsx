import * as React from "react";
import { cn } from "../lib/cn";

export interface TerminalPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Title shown in the terminal header bar. */
  title?: string;
}

/**
 * Terminal-styled panel: header with traffic-light dots + title, monospace body.
 * Children render inside the monospace body area.
 */
export const TerminalPanel = React.forwardRef<HTMLDivElement, TerminalPanelProps>(
  ({ className, title = "terminal", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-lg border border-white/[0.06] bg-surface shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5),0_1px_0_0_rgba(255,255,255,0.04)_inset] transition-[border-color,box-shadow] duration-300",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.015] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-diff-remove/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-diff-add/80" />
        <span className="ml-3 truncate font-mono text-[11px] tracking-wide text-muted">
          {title}
        </span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-text">{children}</div>
    </div>
  ),
);
TerminalPanel.displayName = "TerminalPanel";
