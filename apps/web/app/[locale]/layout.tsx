import type { Metadata } from "next";
import localFont from "next/font/local";
import { GridBackground } from "@insightfy/ui";
import { locales } from "@/i18n";
import "../globals.css";

const display = localFont({
  src: [
    {
      path: "../fonts/ClashDisplay-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/ClashDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const sans = localFont({
  src: [
    { path: "../fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
});

const mono = localFont({
  src: [
    {
      path: "../fonts/MartianMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/MartianMono-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
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
    <html lang={locale} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="relative min-h-screen bg-bg-base text-text antialiased">
        <GridBackground />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
