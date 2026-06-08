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
        "overflow-hidden rounded-xl border border-border bg-surface shadow-2xl shadow-black/40",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-diff-remove" />
        <span className="h-3 w-3 rounded-full bg-[#fbbf24]" />
        <span className="h-3 w-3 rounded-full bg-diff-add" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{title}</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed text-text">{children}</div>
    </div>
  ),
);
TerminalPanel.displayName = "TerminalPanel";
