import * as React from "react";
import { cn } from "../lib/cn";

export type GridBackgroundProps = React.HTMLAttributes<HTMLDivElement>;

const FADED_LOGS = `[INIT] Loading codebase context...
[AGENT-01] // REFACTOR pipeline started
[INFO] provisioning systems + agents...
+ agent: ingest        ready
+ agent: orchestrator  ready
$ insightfy deploy --target production
[OK] build passed in 4.2s — 0 errors
[AGENT-02] // INSIGHTS analysis running
p99 latency: 47ms
[INIT] Loading codebase context...
[AGENT-03] // ORCHESTRATOR fan-out
[INFO] running pipeline (3 agents)...
+ agent: insights      ready
[OK] deploy complete — 0 errors
$ insightfy deploy --target production
[INIT] Loading codebase context...
[AGENT-01] // REFACTOR pipeline started
[INFO] provisioning systems + agents...
+ agent: ingest        ready
+ agent: orchestrator  ready
$ insightfy deploy --target production
[OK] build passed in 4.2s — 0 errors
[AGENT-02] // INSIGHTS analysis running
p99 latency: 47ms
[INIT] Loading codebase context...
[AGENT-03] // ORCHESTRATOR fan-out
[INFO] running pipeline (3 agents)...
+ agent: insights      ready
[OK] deploy complete — 0 errors`;

/**
 * Decorative dot-matrix / grid background with faded terminal logs.
 * Absolutely positioned, non-interactive. Place inside a `relative` parent.
 */
export function GridBackground({ className, style, ...props }: GridBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          ...style,
        }}
      />
      <div className="absolute inset-0 overflow-hidden opacity-[0.025]">
        <pre className="whitespace-pre p-8 font-mono text-[10px] leading-[1.8] text-text select-none">
          {FADED_LOGS}
        </pre>
        <pre
          aria-hidden
          className="absolute left-1/2 top-0 whitespace-pre p-8 font-mono text-[10px] leading-[1.8] text-text select-none"
        >
          {FADED_LOGS}
        </pre>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(65% 50% at 50% 0%, rgba(34,211,238,0.10), transparent 65%)",
        }}
      />
    </div>
  );
}
