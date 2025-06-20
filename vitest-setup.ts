import { vi, beforeEach, beforeAll } from 'vitest';
import setupCountriesISO from './src/i18n/setupCountries';

// globalThis.fetch = vi.fn();

beforeAll(() => {
  setupCountriesISO();
});

beforeEach(() => {
  vi.clearAllMocks();
});
