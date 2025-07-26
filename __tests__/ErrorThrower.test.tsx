import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorThrower from '../src/components/error-thrower/error-thrower';
import { Component, ReactNode } from 'react';
import '@testing-library/jest-dom';
import { expect, describe, it } from 'vitest';

class TestErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div data-testid="fallback">Caught an error</div>;
    }

    return this.props.children;
  }
}

describe('ErrorThrower component', () => {
  it('renders a button', () => {
    render(<ErrorThrower />);

    const button = screen.getByTestId('error-thrower');

    expect(button).toBeInTheDocument();
  });

  it('throws an error when clicked', async () => {
    render(
      <TestErrorBoundary>
        <ErrorThrower />
      </TestErrorBoundary>
    );

    const button = screen.getByTestId('error-thrower');
    await userEvent.click(button);

    expect(screen.getByTestId('fallback')).toBeInTheDocument();
  });
});
