import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { StarWarsService, type PeopleResponse } from '../src/services/api';
import type { Person } from '../src/types/person';

const mockPeopleResponse: PeopleResponse = {
  results: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      gender: 'male',
    } as Person,
  ],
  next: null,
  previous: null,
};

const mockPerson: Person = {
  name: 'Leia Organa',
  height: '150',
  mass: '49',
  gender: 'female',
  hair_color: 'brown',
  skin_color: 'light',
  eye_color: 'brown',
  birth_year: '19BBY',
  homeworld: 'https://swapi.dev/api/planets/2/',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: 'https://swapi.dev/api/people/5/',
};

describe('StarWarsService', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetchPeople should return data for a given query and page', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPeopleResponse,
    });

    const result = await StarWarsService.fetchPeople('luke', 1);
    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/people/?search=luke&page=1'
    );
    expect(result).toEqual(mockPeopleResponse);
  });

  it('fetchPeople should return data without query', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPeopleResponse,
    });

    const result = await StarWarsService.fetchPeople('', 2);
    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/people/?page=2'
    );
    expect(result).toEqual(mockPeopleResponse);
  });

  it('fetchPersonById should return data for a given id', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPerson,
    });

    const result = await StarWarsService.fetchPersonById('5');
    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/5/');
    expect(result).toEqual(mockPerson);
  });

  it('fetchPeople should throw error on failed response', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    await expect(StarWarsService.fetchPeople('luke')).rejects.toThrow(
      'Error: 500'
    );
  });

  it('fetchPersonById should throw error on failed response', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(StarWarsService.fetchPersonById('999')).rejects.toThrow(
      'Error: 404'
    );
  });
});
