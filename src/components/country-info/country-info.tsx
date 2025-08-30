import { formatValue } from '../../utils/formatValue.ts';
import styles from './country-info.module.css';
import type { CountryRow } from '../../utils/filterByYear.ts';
import * as React from 'react';

type Props = {
  sortedCountries: CountryRow[];
  allColumns: string[];
  selectedYear: number;
  prevCountries: CountryRow[];
};

const CountryInfoComponent = ({
  sortedCountries,
  allColumns,
  selectedYear,
  prevCountries,
}: Props) => {
  return (
    <>
      {sortedCountries.map((country) =>
        allColumns.map((col) => {
          const rawValue = country[col as keyof typeof country];
          const value = formatValue(col, rawValue);

          const prevCountry = prevCountries.find((c) => c.ISO === country.ISO);
          const prevValue = prevCountry
            ? formatValue(col, prevCountry[col as keyof typeof prevCountry])
            : null;

          const isUpdated = prevValue !== null && prevValue !== value;

          return (
            <div
              key={`${country.ISO}-${col}-${selectedYear}`}
              className={`${styles.cell} ${value === 'N/A' ? styles.na : ''} ${
                isUpdated ? styles.highlight : ''
              }`}
            >
              {value}
            </div>
          );
        })
      )}
    </>
  );
};

CountryInfoComponent.displayName = 'CountryInfo';

export const CountryInfo = React.memo(CountryInfoComponent);
