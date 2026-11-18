/**
 * i18n utility for consistent language handling across React components
 */

export const locales : Record<string, string> = {
  ja: '日本語',
  'zh-TW': '繁體中文',
} as const;

export type Locale = keyof typeof locales;
export const defaultLang: Locale = 'zh-TW';


