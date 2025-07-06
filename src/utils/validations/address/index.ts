import { getName, getNames } from 'i18n-iso-countries';
import { USState, USTerritories } from '@/models/address/enums/us-regions';
import { CANProvinces, CANTerritories } from '@/models/address/enums/can-regions';
import { MEXState } from '@/models/address/enums/mex-regions';

/**
 * Checks if a country code is valid
 */
export const hasValidCountryCode = (code: string, lang: string = 'en') => !!getName(code, lang);

/**
 * Checks if a country code is valid
 */
export const hasValidCountryName = (name: string, lang: string) => !!(getNames(lang))[name];

/**
 * Fetches the standardized country name
 */
export const getCountryName = (code: string, lang: string) => getName(code, lang);

/**
 * Get all country data
 */
export const getAllCountries = (lang: string) => getNames(lang);

/**
 * Normalizes an address line item
 */
export const normalizeAddressLine = (str: string = '') => str?.trim()?.replace(/\s+/g, ' ') || '';

/**
 * Normalizes region (aka state) formatting
 */
export const normalizeRegion = (region: string, country: string) => {
  if (!region || !country) return '';

  const countryCode = country.trim().toUpperCase();
  const regionLower = region.trim().toLowerCase();
  const regionUpper = region.trim().toUpperCase();

  switch (countryCode) {
    case 'US':
      if (Object.keys(USState).includes(regionUpper)) return regionUpper;

      for (const abbr in USState) {
        const fullName = USState[abbr as keyof typeof USState];
        if (fullName.toLowerCase() === regionLower) return abbr;
      }
      break;
    case 'CAN':
      if (Object.keys(CANProvinces).includes(regionUpper)) return regionUpper;

      for (const abbr in CANProvinces) {
        const fullName = CANProvinces[abbr as keyof typeof CANProvinces];
        if (fullName.toLowerCase() === regionLower) return abbr;
      }
      break;
    case 'MEX': {
      if (Object.keys(MEXState).includes(regionUpper)) return regionUpper;

      const accentStripped = regionLower.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
      for (const abbr in MEXState) {
        const fullName = MEXState[abbr as keyof typeof MEXState];
        if (fullName.toLowerCase() === accentStripped) return abbr;
      }
      break;
    }
    default:
      return region;
  }
  return '';
};

/**
 * Normalizes postal code formatting
 */
export const normalizePostalCode = (code: string, country: string) => {
  if (!code) return '';
  let normalized = code.trim().toUpperCase();

  if (country === 'US') {
    // Format as 5-digit or 5+4
    normalized = normalized.replace(/[^0-9-]/g, '');
    if (/^\d{9}$/.test(normalized)) {
      normalized = `${normalized.slice(0, 5)}-${normalized.slice(5)}`;
    }
  }
  return normalized;
};

/**
 * Determines if a US state is continential only
 */
export const isContinentalUS = (key: string) => key !== 'AK' && key !== 'HI' && Object.values(USState).includes(key as USState);

/**
 * Determines if a state code matches US
 */
export const isUSState = (key: string) => Object.keys(USState).includes(key) || Object.keys(USTerritories).includes(key);

/**
 * Determines if a province code matches CAN
 */
export const isCANProvince = (key: string) => Object.keys(CANProvinces).includes(key) || Object.keys(CANTerritories).includes(key);

/**
 * Determines if a state code match MEX
 */
export const isMEXState = (key: string) => Object.keys(MEXState).includes(key);
