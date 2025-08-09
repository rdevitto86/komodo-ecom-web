import { describe, it, expect, vi } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

vi.mock('@router/routes', () => ({
  AppRouter: () => <div data-testid="app-router">mock-router</div>,
}));

import App from './App';

describe('App', () => {
  afterEach(() => cleanup());

  it('renders the AppRouter', () => {
    render(<App />);
    expect(screen.getByTestId('app-router')).toHaveTextContent('mock-router');
  });
});
