import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Results from '../src/components/results/results.tsx';
import type { Person } from '../src/types/person';

describe('Results component', () => {
  const mockData: { results: Person[] } = {
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
    render(<Results query="skywalker" />);
    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(mockData.results.length);
  });

  it('shows loading state while fetching data', () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn(() => new Promise(() => {}));
    global.fetch = fetchMock;

    render(<Results query="Luke" />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('displays item names and descriptions correctly', async () => {
    render(<Results query="skywalker" />);
    for (const person of mockData.results) {
      expect(await screen.findByText(person.name)).toBeInTheDocument();
      const description = `Height: ${person.height} см, Year of birth: ${person.birth_year}`;
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it('Displays error message when API call fails', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('Failed to fetch')))
    );

    render(<Results query="luke" />);

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });
});
