import { defaultColumns } from '../constants/constants.ts';

export const getAdditionalFields = (
  countries: Array<Record<string, unknown>>
): string[] => {
  const allKeys = Array.from(
    new Set(countries.flatMap((country) => Object.keys(country)))
  );

  return allKeys.filter((key) => !defaultColumns.includes(key));
};
