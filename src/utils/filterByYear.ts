import type { CountryData } from '../hooks/useCO2Data.ts';

export const filterByYear = (
  data: Record<string, CountryData>,
  year: number
) => {
  return Object.entries(data).map(([country, countryData]) => {
    const yearData = countryData.data.find((d) => d.year === year);

    return {
      ...yearData,
      country,
      population: yearData?.population,
      ISO: countryData.iso_code,
      year: yearData?.year,
      co2: yearData?.cement_co2,
      co2_per_capita: yearData?.cement_co2_per_capita,
    };
  });
};
