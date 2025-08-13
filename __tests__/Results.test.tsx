import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

vi.mock('../src/store/selectors/searchSelectors', () => ({
  useSelectedPeople: () => ({}),
  useUnselectPerson: () => () => {},
  useSelectPerson: () => () => {},
  useClearSelection: () => () => {},
}));

vi.mock('../src/services/api', () => ({
  StarWarsService: {
    fetchPeopleByQuery: vi.fn(),
    defaultFetchPeople: vi.fn(),
  },
}));

import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from '../src/components/results/results';
import * as api from '../src/services/api';
import type { Person } from '../src/types/person';

const getMockPerson = (overrides: Partial<Person>): Person => ({
  name: 'Default Name',
  height: '0',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: 'unknown',
  gender: '',
  films: [],
  homeworld: '',
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.dev/api/people/999/',
  ...overrides,
});

const mockResults = [
  getMockPerson({
    name: 'Luke Skywalker',
    height: '172',
    birth_year: '19BBY',
  }),
  getMockPerson({
    name: 'Leia Organa',
    height: '150',
    birth_year: '19BBY',
  }),
  getMockPerson({
    name: 'Han Solo',
    height: '180',
    birth_year: '29BBY',
  }),
];

describe.skip('Results component', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    (
      api.StarWarsService.fetchPeopleByQuery as unknown as vi.Mock
    ).mockResolvedValue({
      results: mockResults,
      next: null,
      previous: null,
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders correct number of items when data is provided', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Results query="skywalker" />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(mockResults.length);
    });
  });

  it('shows loading state while fetching data', () => {
    (
      api.StarWarsService.fetchPeopleByQuery as unknown as vi.Mock
    ).mockImplementation(() => new Promise(() => {}));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Results query="any" />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('displays item names and descriptions correctly', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Results query="skywalker" />
        </MemoryRouter>
      </QueryClientProvider>
    );

    for (const person of mockResults) {
      await waitFor(() => {
        expect(
          screen.getByText((txt) => txt.includes(person.name))
        ).toBeInTheDocument();

        const description = `Height: ${person.height}, Birth year: ${person.birth_year}`;
        expect(
          screen.getByText((txt) => txt.includes(description))
        ).toBeInTheDocument();
      });
    }
  });

  it('displays error message when API call fails', async () => {
    (
      api.StarWarsService.fetchPeopleByQuery as unknown as vi.Mock
    ).mockRejectedValue(new Error('Failed to fetch'));

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Results query="error" />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(await screen.findByText(/failed to fetch/i)).toBeInTheDocument();
  });

  it('uses cached data on second render with same query', async () => {
    const spy = vi.spyOn(api.StarWarsService, 'fetchPeopleByQuery');

    const testClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: Infinity,
        },
      },
    });

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={testClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );

    const { unmount } = render(<Results query="skywalker" />, { wrapper });

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(mockResults.length);
    });

    unmount();

    render(<Results query="skywalker" />, { wrapper });

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items).toHaveLength(mockResults.length);
    });

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
