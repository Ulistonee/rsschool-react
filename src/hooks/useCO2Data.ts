import { createResource } from '../utils/createResource';

export type CountryData = {
  iso_code: string;
  data: YearData[];
};

export type YearData = {
  year: number;
  population?: number;
  cement_co2?: number;
  cement_co2_per_capita?: number;
};

const resource = createResource(
  fetch('/owid-co2-data.json').then((res) => res.json())
);

export function useCO2Data() {
  return resource.read() as Record<string, CountryData>;
}
