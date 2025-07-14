import { render, screen } from '@testing-library/react';
import App from '../src/App.tsx';
import { describe } from 'vitest';

describe('App', () => {
  it('renders App component and shows input and error-thrower', () => {
    render(<App />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('error-thrower')).toBeInTheDocument();
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('displays previously saved value from localStorage on load', () => {
    localStorage.setItem('search', 'luke');

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('luke');
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('shows empty input when no saved term exists', () => {
    render(<App />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });
});
