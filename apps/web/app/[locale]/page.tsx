import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pillars } from "@/components/sections/Pillars";
import { AgentsDemo } from "@/components/sections/AgentsDemo";
import { Metrics } from "@/components/sections/Metrics";
import { Process } from "@/components/sections/Process";
import { Cases } from "@/components/sections/Cases";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) {
    notFound();
  }
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  return (
    <>
      <Nav dict={dict.nav} locale={locale} />
      <main>
        <Hero dict={dict.hero} locale={locale} />
        <SocialProof dict={dict.socialProof} />
        <Pillars dict={dict.pillars} />
        <AgentsDemo dict={dict.agentsDemo} />
        <Metrics dict={dict.metrics} />
        <Process dict={dict.process} />
        <Cases dict={dict.cases} />
        <FinalCta dict={dict.finalCta} />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}
