import type { Person } from '../types/person';

const BASE_URL = 'https://swapi.py4e.com/api';

export const StarWarsService = {
  async fetchPeople(query = ''): Promise<Person[]> {
    const url = query
      ? `${BASE_URL}/people/?search=${query}`
      : `${BASE_URL}/people/`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data.results || [];
  },
};
