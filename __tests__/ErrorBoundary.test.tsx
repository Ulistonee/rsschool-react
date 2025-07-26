import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import ErrorBoundary from '../src/components/error-boundary/error-boundary';
import ErrorThrower from '../src/components/error-thrower/error-thrower';
import '@testing-library/jest-dom';

beforeEach(() => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ErrorBoundary', () => {
  it('Catches and handles JavaScript errors in child components', () => {
    render(
      <ErrorBoundary>
        <ErrorThrower />
      </ErrorBoundary>
    );

    const button = screen.getByTestId('error-thrower');
    fireEvent.click(button);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
