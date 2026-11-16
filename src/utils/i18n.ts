/**
 * i18n utility for consistent language handling across React components
 */

export type LanguageKey = "zh-TW" | "ja";

const DEFAULT_LANGUAGE: LanguageKey = "zh-TW";
const STORAGE_KEY = "trip-language";
const LANGUAGE_CHANGE_EVENT = "language-change";

/**
 * Resolve the effective language while preserving user preference and explicit route locale.
 * Japanese routes should stay Japanese unless the user has intentionally changed the stored language.
 */
export const resolveLanguage = (routeLanguage?: LanguageKey): LanguageKey => {
  if (typeof window === "undefined") {
    return routeLanguage || DEFAULT_LANGUAGE;
  }

  const pathname = window.location.pathname;
  const explicitRouteLanguage = pathname.startsWith("/ja") ? "ja" : pathname.startsWith("/zh") ? "zh-TW" : undefined;
  const stored = localStorage.getItem(STORAGE_KEY);

  if (explicitRouteLanguage) {
    return explicitRouteLanguage;
  }

  if (stored === "ja" || stored === "zh-TW") {
    return stored;
  }

  return routeLanguage || DEFAULT_LANGUAGE;
};

/**
 * Get current language from localStorage (with fallback for SSR)
 */
export const getCurrentLanguage = (): LanguageKey => {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = localStorage.getItem(STORAGE_KEY);
  return (stored as LanguageKey) || DEFAULT_LANGUAGE;
};

/**
 * Get localized text from a bilingual object
 */
export const getLocalizedText = (
  textObject: Record<string, string> | { [key in LanguageKey]: string },
  language?: LanguageKey
): string => {
  const lang = language || getCurrentLanguage();
  return textObject[lang] || textObject[DEFAULT_LANGUAGE] || "";
};

/**
 * Subscribe to language changes
 */
export const onLanguageChange = (callback: (language: LanguageKey) => void) => {
  const handler = () => {
    const newLanguage = getCurrentLanguage();
    callback(newLanguage);
  };
  window.addEventListener(LANGUAGE_CHANGE_EVENT, handler);
  return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, handler);
};

/**
 * Dispatch language change event
 */
export const dispatchLanguageChange = () => {
  window.dispatchEvent(new CustomEvent(LANGUAGE_CHANGE_EVENT));
};

/**
 * Get table header labels for buses table
 */
export const getBusTableHeaders = (language: LanguageKey) => ({
  route: language === "ja" ? "ルート" : "路線",
  destination: language === "ja" ? "目的地" : "目的地",
  time: language === "ja" ? "所要時間" : "所需時間",
});

/**
 * Get popup labels for bus info
 */
export const getBusPopupLabels = (language: LanguageKey) => ({
  destination: language === "ja" ? "到着地: " : "到達: ",
  time: language === "ja" ? "時間: " : "時間: ",
});
