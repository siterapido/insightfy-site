import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { GridBackground } from "@insightfy/ui";
import { locales } from "@/i18n";
import "../globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  return {
    metadataBase: new URL("https://insightfy.com.br"),
    title: {
      default: "Insightfy — Sistemas sob medida e Agentes de IA",
      template: "%s · Insightfy",
    },
    description: isPt
      ? "Software house focada em sistemas sob medida e agentes de IA em produção."
      : "Software house focused on custom systems and AI agents in production.",
    openGraph: {
      title: "Insightfy",
      url: `https://insightfy.com.br/${locale}`,
      siteName: "Insightfy",
      locale: isPt ? "pt_BR" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} className={`${sans.variable} ${mono.variable}`}>
      <body className="relative min-h-screen bg-bg-base text-text antialiased">
        <GridBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
