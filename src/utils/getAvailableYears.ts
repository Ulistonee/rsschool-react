import type { CountryData } from '../hooks/useCO2Data.ts';

export const getAvailableYears = (
  data: Record<string, CountryData>
): number[] => {
  const years = new Set<number>();

  Object.values(data).forEach((country) => {
    country.data.forEach((d) => years.add(d.year));
  });

  return Array.from(years).sort((a, b) => b - a);
};
