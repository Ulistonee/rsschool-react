import { render, screen } from '@testing-library/react';
import Search from '../src/components/search/search.tsx';
import { vi } from 'vitest';

describe('Search component', () => {
  test('renders search input and button', () => {
    const mockOnSearch = vi.fn();

    render(<Search onSearch={mockOnSearch} />);

    const input = screen.getByPlaceholderText(/search/i);
    expect(input).toBeInTheDocument();

    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeInTheDocument();
  });
});
