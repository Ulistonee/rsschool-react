import { render, screen } from '@testing-library/react';
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
  });

  it('renders correct number of items when data is provided', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      ) as unknown as typeof fetch
    );

    render(<Results query="skywalker" />);

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(mockData.results.length);
  });

  describe('loading state', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('Shows loading state while fetching data', () => {
      const fetchMock = vi.fn(() => new Promise(() => {}));
      global.fetch = fetchMock;

      render(<Results query="Luke" />);
      expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });
  });

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

  it('Displays item names and descriptions correctly', async () => {
    render(<Results query="skywalker" />);

    // Проверяем, что имена отображаются
    for (const person of mockData.results) {
      expect(await screen.findByText(person.name)).toBeInTheDocument();

      const description = `Height: ${person.height} см, Year of birth: ${person.birth_year}`;
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });
});
