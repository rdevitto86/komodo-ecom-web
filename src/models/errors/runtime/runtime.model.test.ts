import { describe, it, expect } from 'vitest';
import RuntimeError, { RuntimeErrorCode } from './runtime.model';

describe('RuntimeError', () => {
  it('creates an instance with the expected properties', () => {
    const message = 'Invalid input';
    const code = '1003_VALIDATION_ERROR';
    const status = 500 as RuntimeErrorCode;
    const details = 'Validation failed';
    const cause = new Error('things happened...');

    const err = new RuntimeError<'ERROR'>(message, code, { status, details, cause });

    expect(err).toBeInstanceOf(RuntimeError);
    expect(err).toBeInstanceOf(Error);
    expect(err.name).toBe('RuntimeError');
    expect(err.message).toBe(message);
    expect(err.code).toBe(code);
    expect(err.details).toBe(details);
    expect(err.cause).toBeInstanceOf(Error);
    expect(err.timestamp).toBeInstanceOf(Date);
  });
});
