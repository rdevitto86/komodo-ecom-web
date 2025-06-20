import { getName, getNames } from "i18n-iso-countries";

// ===== COUNTRY CODE UTILS =====
/**
 * Checks if a country code is valid
 * @param code iso country code
 * @param lang language to use
 */
export const hasValidCountryCode = (code: string, lang: string) => !!getName(code, lang);

/**
 * Checks if a country code is valid
 * @param name country name
 * @param lang language to use
 */
export const hasValidCountryName = (name: string, lang: string) => !!(getNames(lang))[name];

/**
 * Fetches the standardized country name
 * @param code iso country code
 * @param lang language to use
 * @returns gets standard country names
 */
export const getCountryName = (code: string, lang: string) => getName(code, lang);

/**
 * Get all country data
 * @param lang language to use
 * @returns list of available country names
 */
export const getAllCountries = (lang: string) => getNames(lang);
