import type { Dictionary, Locale } from "./types";
import { pt } from "./dictionaries/pt";
import { en } from "./dictionaries/en";

export const locales: Locale[] = ["pt", "en"];
export const defaultLocale: Locale = "pt";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function isLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export * from "./types";
