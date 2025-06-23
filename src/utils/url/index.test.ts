import { describe, it, beforeEach, afterEach, expect } from 'vitest';
import { buildURL } from '.';

describe('buildURL', () => {
  const originalEnv = process.env.BASE_API_URL;

  beforeEach(() => {
    process.env.BASE_API_URL = 'https://api.example.com';
  });

  afterEach(() => {
    process.env.BASE_API_URL = originalEnv;
  });

  describe('basic URL building', () => {
    it('builds generic URL', () => {
      expect(buildURL('/users')).toBe('https://api.example.com/users');
    });

    it('returns base URL with trailing slash when apiPath is empty', () => {
      expect(buildURL('')).toBe('https://api.example.com/');
    });

    it('returns relative path when omitBaseUrl is true', () => {
      expect(buildURL('/users', {}, {}, true)).toBe('/users');
      expect(buildURL('', {}, {}, true)).toBe('/');
    });
  });

  describe('path parameters', () => {
    it('replaces single and multiple path params', () => {
      expect(buildURL('/users/:userId', { userId: 123 })).toBe('https://api.example.com/users/123');
      expect(buildURL('/users/:userId/orders/:orderId', { userId: 1, orderId: 2 })).toBe('https://api.example.com/users/1/orders/2');
    });

    it('encodes path param values', () => {
      expect(buildURL('/search/:query', { query: 'a/b&c' })).toBe('https://api.example.com/search/a%2Fb%26c');
    });

    it('throws for missing path params', () => {
      // @ts-expect-error testing invalid input
      expect(() => buildURL('/users/:userId', { userId: undefined })).toThrowError('Missing path parameter: userId');
      expect(() => buildURL('/users/:userId', {})).toThrowError('Missing path parameter: userId');
    });
  });

  describe('query parameters', () => {
    it('appends query params correctly', () => {
      expect(buildURL('/api/data', {}, { page: 2, sort: 'desc' })).toBe('https://api.example.com/api/data?page=2&sort=desc');
      expect(buildURL('/api/data', {}, { tag: ['a', 'b'] })).toBe('https://api.example.com/api/data?tag=a&tag=b');
      expect(buildURL('/api/data', {}, { q: 'a b&c' })).toBe('https://api.example.com/api/data?q=a+b%26c');
    });

    it('does not append empty or null query params', () => {
      expect(buildURL('/api/data', {}, {})).toBe('https://api.example.com/api/data');
      expect(buildURL('/api/data', {}, { page: null, sort: undefined })).toBe('https://api.example.com/api/data');
    });
  });

  describe('environment variable validation', () => {
    it('throws if BASE_API_URL is missing and omitBaseUrl is false', () => {
      delete process.env.BASE_API_URL;
      expect(() => buildURL('/users')).toThrow('BASE_API_URL environment variable is not defined.');
    });
  });

  describe('relative URLs with omitBaseUrl=true', () => {
    it('appends query params when present', () => {
      const result = buildURL('/relative/path', {}, { foo: 'bar', arr: ['a', 'b'] }, true);
      expect(result).toBe('/relative/path?foo=bar&arr=a&arr=b');
    });

    it('returns path without query when no query params', () => {
      const result = buildURL('/relative/path', {}, {}, true);
      expect(result).toBe('/relative/path');
    });
  });
});
