import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { describe, beforeEach, vi, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe.skip('App', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('renders App component and shows input and error-thrower', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('error-thrower')).toBeInTheDocument();
  });

  it('displays previously saved value from localStorage on load', () => {
    localStorage.setItem('search', 'luke');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toHaveValue('luke');
  });

  it('shows empty input when no saved term exists', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('');
  });

  it('trims whitespace from search input before saving', async () => {
    const LS_KEY = 'search';
    const searchTerm = '  spaced query  ';
    const trimmedTerm = searchTerm.trim();

    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, searchTerm);
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith(LS_KEY, trimmedTerm);
  });

  it('overwrites existing localStorage value when new search is performed', async () => {
    const user = userEvent.setup();
    localStorage.setItem('search', 'old value');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toHaveValue('old value');

    await user.clear(input);
    await user.type(input, 'new value');
    await user.click(button);

    expect(localStorage.getItem('search')).toBe('new value');
  });
});
