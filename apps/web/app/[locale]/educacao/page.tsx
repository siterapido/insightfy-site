import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/i18n";
import type { Locale } from "@/i18n/types";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import {
  EducationFaq,
  EducationHero,
  EducationReceive,
  EducationTracks,
  MaturitySplit,
} from "@/components/education/EducationSections";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isPt = locale === "pt";
  return {
    title: isPt ? "Educação em IA e agentes" : "AI & agent education",
    description: isPt
      ? "Formação prática em agentes Hermes, segundo cérebro e operação Insightfy — para times que querem IA em produção."
      : "Hands-on Hermes agents, second brain, and Insightfy ops training.",
  };
}

export default async function EducacaoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);
  const isPt = locale === "pt";

  return (
    <>
      <Nav dict={dict.nav} locale={locale} />
      <main>
        <EducationHero
          locale={locale}
          title={
            isPt ? (
              <>
                Agentes e <span className="text-accent">formação</span> para sua
                operação
              </>
            ) : (
              <>
                Agents and <span className="text-accent">training</span> for your
                ops
              </>
            )
          }
          subtitle={
            isPt
              ? "Trilhas inspiradas em hubs educacionais de IA — com o DNA Insightfy: sistemas reais, segundo cérebro e Hermes em produção."
              : "Tracks inspired by AI education hubs — with Insightfy DNA: real systems, second brain, Hermes in production."
          }
          primaryHref={`/${locale}/educacao/agente-pessoal-hermes`}
          primaryLabel={isPt ? "Curso Agente Hermes" : "Hermes agent course"}
          secondaryHref={`/${locale}#contato`}
          secondaryLabel={isPt ? "Falar com o time" : "Talk to us"}
        />
        <MaturitySplit locale={locale} />
        <EducationTracks locale={locale} />
        <EducationReceive locale={locale} />
        <EducationFaq locale={locale} />
      </main>
      <Footer dict={dict.footer} locale={locale} />
    </>
  );
}