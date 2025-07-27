import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NotFound from '../src/pages/not-found/not-found';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';

describe('NotFound component', () => {
  it('renders the 404 message and Home link', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /404/i })).toBeInTheDocument();

    expect(
      screen.getByText(/Check the address or return to/i)
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });
});
