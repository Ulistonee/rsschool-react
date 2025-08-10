import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StarWarsService, type PeopleResponse } from '../src/services/api';

const mockPeopleResponse: PeopleResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [{ name: 'Luke Skywalker', url: 'https://swapi.dev/api/people/1/' }],
};

globalThis.fetch = vi.fn();

describe('StarWarsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('defaultFetchPeople should return data for a given page', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPeopleResponse,
    });

    const result = await StarWarsService.defaultFetchPeople(2);

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/people/?page=2'
    );
    expect(result).toEqual(mockPeopleResponse);
  });

  it('fetchPeopleByQuery should return data for a given query and page', async () => {
    (globalThis.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPeopleResponse,
    });

    const result = await StarWarsService.fetchPeopleByQuery('luke');

    expect(fetch).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/people/?search=luke'
    );
    expect(result).toEqual(mockPeopleResponse);
  });
});
