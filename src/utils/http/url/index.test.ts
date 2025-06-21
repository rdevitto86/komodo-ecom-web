import { describe, it, expect } from 'vitest';
import { buildURLWithPathParams, buildURLWithQuery } from './index';

describe('buildURLWithPathParams', () => {
  it('replaces single param', () => {
    const result = buildURLWithPathParams('/users/:userId', { userId: 123 });
    expect(result).toBe('/users/123');
  });

  it('replaces multiple params', () => {
    const result = buildURLWithPathParams('/users/:userId/orders/:orderId', { userId: 1, orderId: 2 });
    expect(result).toBe('/users/1/orders/2');
  });

  it('encodes values', () => {
    const result = buildURLWithPathParams('/search/:query', { query: 'a/b&c' });
    expect(result).toBe('/search/a%2Fb%26c');
  });

  it('leaves unmatched params', () => {
    const result = buildURLWithPathParams('/users/:userId', { userId: 1, unused: 2 });
    expect(result).toBe('/users/1');
  });
});

describe('buildURLWithQuery', () => {
  it('should append query parameters', () => {
    const result = buildURLWithQuery('/api/data', { page: 2, sort: 'desc' });
    expect(result).toBe('/api/data?page=2&sort=desc');
  });

  it('should omit undefined values', () => {
    const result = buildURLWithQuery('/api/data', { page: 2, sort: undefined });
    expect(result).toBe('/api/data?page=2');
  });

  it('should handle empty query object', () => {
    const result = buildURLWithQuery('/api/data', {});
    expect(result).toBe('/api/data');
  });

  it('should return base URL when no query provided', () => {
    const result = buildURLWithQuery('/api/data');
    expect(result).toBe('/api/data');
  });

  it('encodes query values', () => {
    const result = buildURLWithQuery('/api/data', { q: 'a b&c' });
    expect(result).toBe('/api/data?q=a+b%26c');
  });
});
