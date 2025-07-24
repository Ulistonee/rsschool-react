import type { Person } from '../types/person';

const BASE_URL = 'https://swapi.py4e.com/api';

export type PeopleResponse = {
  results: Person[];
  next: string | null;
  previous: string | null;
};

export const StarWarsService = {
  async fetchPeople(query: string, page = 1): Promise<PeopleResponse> {
    const url = query
      ? `${BASE_URL}/people/?search=${query}&page=${page}`
      : `${BASE_URL}/people/?page=${page}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return await response.json();
  },
};
