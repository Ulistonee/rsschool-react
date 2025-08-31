import type { CountryRow } from './filterByYear.ts';

export const sortCountries = (
  countries: CountryRow[],
  sortKey: 'name' | 'population',
  sortOrder: 'asc' | 'desc'
): CountryRow[] => {
  return [...countries].sort((a, b) => {
    if (sortKey === 'name') {
      return sortOrder === 'asc'
        ? a.country.localeCompare(b.country)
        : b.country.localeCompare(a.country);
    }
    if (sortKey === 'population') {
      const popA = a.population ?? 0;
      const popB = b.population ?? 0;
      return sortOrder === 'asc' ? popA - popB : popB - popA;
    }
    return 0;
  });
};
