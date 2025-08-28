import type { CountryData } from '../hooks/useCO2Data.ts';

export const filterByLatestYear = (data: Record<string, CountryData>) => {
  return Object.entries(data).map(([country, countryData]) => {
    const latest = countryData.data[countryData.data.length - 1];

    return {
      ...latest,
      country,
      population: latest?.population,
      ISO: countryData.iso_code,
      last_year: latest?.year,
      co2: latest?.cement_co2,
      co2_per_capita: latest?.cement_co2_per_capita,
    };
  });
};
