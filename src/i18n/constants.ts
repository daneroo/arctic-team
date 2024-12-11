import { translations } from "./translations";

export const defaultLanguage = "en";
export type Language = "en" | "fr";
export type TranslationKey = keyof typeof translations.en;
