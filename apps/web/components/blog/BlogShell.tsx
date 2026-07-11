import type { ReactNode } from "react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import type { Dictionary, Locale } from "@/i18n/types";

export function BlogShell({
  dict,
  locale,
  children,
}: {
  dict: Dictionary;
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <>
      <Nav dict={dict.nav} locale={locale} />
      <main className="min-h-[70vh] pb-20">{children}</main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
