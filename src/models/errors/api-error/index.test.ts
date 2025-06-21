import { describe, it, expect } from 'vitest';
import APIError from '.';

describe('APIError', () => {
  it('creates an instance with the expected properties', () => {
    const message = 'Request failed';
    const statusCode = 404;
    const code = '1003'
    const apiName = 'UsersAPI';
    const correlationId = 'test-correlation-id';
    const cause = new Error('something happened...');

    const err = new APIError(message, statusCode, { code, apiName, correlationId, cause });

    expect(err).toBeInstanceOf(APIError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('APIError');
    expect(err.message).toBe(message);
    expect(err.statusCode).toBe(statusCode);
    expect(err.apiName).toBe(apiName);
    expect(err.correlationId).toBe(correlationId);
    expect(err.cause).toBeInstanceOf(Error);
    expect(err.timestamp).toBeInstanceOf(Date);
  });
});
