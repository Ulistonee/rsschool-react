import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Results from '../src/components/results/results';
import type { Person } from '../src/types/person';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import * as api from '../src/services/api';

describe('Results', () => {
  const getMockPerson = (overrides: Partial<Person>): Person => ({
    name: 'default name',
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
    url: '',
    ...overrides,
  });

  const mockData: { results: Person[] } = {
    results: [
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
      getMockPerson({ name: 'Han Solo', height: '180', birth_year: '29BBY' }),
    ],
  };

  beforeEach(() => {
    vi.restoreAllMocks();

    vi.spyOn(api.StarWarsService, 'fetchPeople').mockResolvedValue({
      results: mockData.results,
      next: null,
      previous: null,
    });
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
      const description = `Height: ${person.height}, Birth year: ${person.birth_year}`;
      expect(screen.getByText(description)).toBeInTheDocument();
    }
  });

  it('Displays error message when API call fails', async () => {
    vi.spyOn(api.StarWarsService, 'fetchPeople').mockRejectedValue(
      new Error('Failed to fetch')
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
