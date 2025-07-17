import { render, screen } from '@testing-library/react';
import App from '../src/App.tsx';
import { describe } from 'vitest';
import userEvent from '@testing-library/user-event';

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

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('trims whitespace from search input before saving', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, '   spaced query   ');
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith('search', 'spaced query');
  });

  beforeEach(() => {
    localStorage.clear();
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem('search', 'old value');

    render(<App />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toHaveValue('old value');

    await user.clear(input);
    await user.type(input, 'new value');
    await user.click(button);

    expect(localStorage.getItem('search')).toBe('new value');
  });
});
