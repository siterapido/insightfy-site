/**
 * FinalCta (client) — closing CTA with a STUB contact form (UI only, no backend).
 * STABLE CONTRACT: export `FinalCta`, props { dict: Dictionary["finalCta"] }.
 * onSubmit prevents default and shows successMessage. A later agent wires backend.
 */
"use client";

import * as React from "react";
import { Button, Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface FinalCtaProps {
  dict: Dictionary["finalCta"];
}

export function FinalCta({ dict }: FinalCtaProps) {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-bg-base px-3 py-2 text-sm text-text outline-none placeholder:text-muted focus:border-accent";

  return (
    <section id="contato" className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading centered title={dict.title} subtitle={dict.subtitle} />
        <Card className="w-full max-w-xl">
          {submitted ? (
            <p className="py-8 text-center font-mono text-sm text-diff-add">
              {dict.successMessage}
            </p>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={inputClass} placeholder={dict.form.name} aria-label={dict.form.name} />
                <input
                  className={inputClass}
                  type="email"
                  placeholder={dict.form.email}
                  aria-label={dict.form.email}
                />
              </div>
              <input className={inputClass} placeholder={dict.form.company} aria-label={dict.form.company} />
              <textarea
                className={inputClass}
                rows={4}
                placeholder={dict.form.message}
                aria-label={dict.form.message}
              />
              <Button type="submit" variant="primary">
                {dict.form.submit}
              </Button>
            </form>
          )}
        </Card>
      </Container>
    </section>
  );
}
