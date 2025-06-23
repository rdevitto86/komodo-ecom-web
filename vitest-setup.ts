import { vi, beforeEach, beforeAll } from 'vitest';
import setupCountriesISO from './src/i18n/setupCountries';

// globalThis.fetch = vi.fn();

beforeAll(() => {
  setupCountriesISO();

  process.env.BASE_API_URL = 'https://api.example.com';
});

beforeEach(() => {
  vi.clearAllMocks();
});
