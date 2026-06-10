"use client";

/**
 * Metrics — headline numbers row.
 * STABLE CONTRACT: export `Metrics`, props { dict: Dictionary["metrics"] }.
 */
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Container } from "@insightfy/ui";
import type { Dictionary, MetricItem } from "@/i18n/types";

export interface MetricsProps {
  dict: Dictionary["metrics"];
}

function parseValue(value: string) {
  const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
  if (!match) return null;
  const numeric = match[2];
  if (!numeric) return null;
  const target = Number(numeric.replace(",", "."));
  if (Number.isNaN(target)) return null;
  const decimals = numeric.includes(".") ? (numeric.split(".")[1]?.length ?? 0) : 0;
  return { prefix: match[1] ?? "", target, suffix: match[3] ?? "", decimals };
}

function MetricValue({ value, active }: { value: string; active: boolean }) {
  const reduceMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(() =>
    parsed && !reduceMotion ? `${parsed.prefix}0${parsed.suffix}` : value,
  );

  useEffect(() => {
    if (!active || !parsed || reduceMotion) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.target, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplay(
          `${parsed.prefix}${latest.toFixed(parsed.decimals)}${parsed.suffix}`,
        );
      },
    });
    return () => controls.stop();
  }, [active, value, reduceMotion]);

  return (
    <span className="font-mono text-4xl font-bold tabular-nums text-accent sm:text-5xl">
      {display}
    </span>
  );
}

export function Metrics({ dict }: MetricsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="metricas" className="border-y border-border py-10">
      <Container ref={ref}>
        <div className="flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
          {dict.items.map((item: MetricItem, i: number) => (
            <div
              key={item.label}
              className={[
                "flex flex-col gap-0.5 py-8 sm:py-0",
                i === 0
                  ? "sm:pr-10"
                  : i === dict.items.length - 1
                    ? "sm:pl-10"
                    : "sm:px-10",
                "flex-1",
              ].join(" ")}
            >
              <MetricValue value={item.value} active={inView} />
              <span className="text-xs uppercase tracking-widest text-muted/60">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
