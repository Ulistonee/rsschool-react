import { render, screen } from '@testing-library/react';
import Search from '../src/components/search/search.tsx';
import { it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('Search', () => {
  it('renders search input and button', () => {
    const mockOnSearch = vi.fn();

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });

  it('updates input value when user types', async () => {
    const user = userEvent.setup();
    render(<Search onSearch={() => {}} />);

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

    expect(input.value).toBe('');

    await user.type(input, 'react');

    expect(input.value).toBe('react');
  });

  it('calls onSearch and localStorage.setItem when search button is clicked', async () => {
    const user = userEvent.setup();
    const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem');
    const handleSearch = (value: string) => {
      localStorage.setItem('search', value);
    };

    render(<Search onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'react');
    await user.click(button);

    expect(setItemSpy).toHaveBeenCalledWith('search', 'react');
  });

  it('triggers search callback with correct parameters', async () => {
    const user = userEvent.setup();
    const onSearchMock = vi.fn();

    render(<Search onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    await user.type(input, 'hello');
    await user.click(button);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('hello');
  });
});
