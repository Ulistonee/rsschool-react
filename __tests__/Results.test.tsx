import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Results from '../src/components/results/results';
import type { Person } from '../src/types/person';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe.skip('Results', () => {
  const mockData: { results: Partial<Person>[] } = {
    results: [
      { name: 'Luke Skywalker', height: '172', birth_year: '19BBY' },
      { name: 'Leia Organa', height: '150', birth_year: '19BBY' },
      { name: 'Han Solo', height: '180', birth_year: '29BBY' },
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      ) as unknown as typeof fetch
    );
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correct number of items when data is provided', async () => {
    render(
      <MemoryRouter>
        <Results query="skywalker" />
      </MemoryRouter>
    );

    const items = await screen.findAllByRole('listitem');

    expect(items).toHaveLength(mockData.results.length);
  });

  it('shows loading state while fetching data', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter>
        <Results query="Luke" />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('displays item names and descriptions correctly', async () => {
    render(
      <MemoryRouter>
        <Results query="skywalker" />
      </MemoryRouter>
    );

    for (const person of mockData.results) {
      if (person.name) {
        expect(await screen.findByText(person.name)).toBeInTheDocument();
      }
      const description = `Height: ${person.height} см, Year of birth: ${person.birth_year}`;
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it('Displays error message when API call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Failed to fetch')))
    );

    render(
      <MemoryRouter>
        <Results query="luke" />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
