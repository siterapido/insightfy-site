/**
 * FinalCta (client) — closing CTA with a STUB contact form (UI only, no backend).
 * STABLE CONTRACT: export `FinalCta`, props { dict: Dictionary["finalCta"] }.
 * onSubmit prevents default and shows successMessage. A later agent wires backend.
 */
"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button, Card, Container, SectionHeading } from "@insightfy/ui";
import type { Dictionary } from "@/i18n/types";

export interface FinalCtaProps {
  dict: Dictionary["finalCta"];
}

export function FinalCta({ dict }: FinalCtaProps) {
  const [submitted, setSubmitted] = React.useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // UI-only stub: no network request. A later agent wires the backend.
    setSubmitted(true);
  }

  const labelClass = "font-mono text-xs uppercase tracking-widest text-muted";
  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors placeholder:text-muted/60 focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <section id="contato" className="py-24 sm:py-32">
      <Container className="flex flex-col items-center gap-10">
        <SectionHeading centered title={dict.title} subtitle={dict.subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-xl"
        >
          <Card className="w-full">
            {submitted ? (
              <p
                role="status"
                aria-live="polite"
                className="py-10 text-center font-mono text-sm text-diff-add"
              >
                {dict.successMessage}
              </p>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className={labelClass}>
                      {dict.form.name}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className={labelClass}>
                      {dict.form.email}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-company" className={labelClass}>
                    {dict.form.company}
                  </label>
                  <input
                    id="contact-company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    className={inputClass}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className={labelClass}>
                    {dict.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    className={`${inputClass} resize-y`}
                  />
                </div>

                <Button type="submit" variant="primary" className="mt-1 w-full sm:w-auto sm:self-end">
                  {dict.form.submit}
                </Button>
              </form>
            )}
          </Card>
        </motion.div>
      </Container>
    </section>
  );
}
